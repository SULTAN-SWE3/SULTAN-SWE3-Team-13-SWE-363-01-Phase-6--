import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

const distDir = resolve('dist');
const minSizeBytes = 1024;

const compressibleExtensions = new Set([
  '.html',
  '.css',
  '.js',
  '.mjs',
  '.json',
  '.svg',
  '.txt',
  '.xml',
  '.webmanifest',
  '.wasm',
]);

const rasterImageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.avif']);

if (!existsSync(distDir)) {
  console.error('dist folder was not found. Run npm run build before compressing assets.');
  process.exit(1);
}

const files = [];
const rasterImages = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const extension = extname(entry.name).toLowerCase();

    if (entry.name.endsWith('.gz') || entry.name.endsWith('.br')) {
      continue;
    }

    if (rasterImageExtensions.has(extension)) {
      rasterImages.push(fullPath);
      continue;
    }

    if (compressibleExtensions.has(extension)) {
      files.push(fullPath);
    }
  }
}

walk(distDir);

let compressedCount = 0;
let originalTotal = 0;
let gzipTotal = 0;
let brotliTotal = 0;

for (const file of files) {
  const source = readFileSync(file);

  if (source.byteLength < minSizeBytes) {
    continue;
  }

  const gzip = gzipSync(source, { level: 9 });
  const brotli = brotliCompressSync(source, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
    },
  });

  writeFileSync(`${file}.gz`, gzip);
  writeFileSync(`${file}.br`, brotli);

  compressedCount += 1;
  originalTotal += source.byteLength;
  gzipTotal += gzip.byteLength;
  brotliTotal += brotli.byteLength;
}

const toKb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

console.log(
  `Compressed ${compressedCount} production assets: ${toKb(originalTotal)} original, ${toKb(gzipTotal)} gzip, ${toKb(brotliTotal)} brotli.`
);

if (rasterImages.length > 0) {
  console.log(
    `Detected ${rasterImages.length} raster image asset(s). Keep image sources optimized as WebP or AVIF before build; HTTP pre-compression is skipped for already-compressed image formats.`
  );
} else {
  console.log('No raster image assets were found in dist.');
}
