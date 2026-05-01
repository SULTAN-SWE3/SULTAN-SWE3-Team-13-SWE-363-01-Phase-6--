require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

connectDB();

if (isProduction) {
  app.set('trust proxy', 1);
  app.use((req, res, next) => {
    const forwardedProto = req.get('x-forwarded-proto')?.split(',')[0].trim();

    if (req.secure || forwardedProto === 'https') {
      return next();
    }

    return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  });
}

app.use(
  helmet({
    strictTransportSecurity: isProduction
      ? {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        }
      : false,
  })
);
app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/resources', require('./routes/resources'));

app.get('/', (_req, res) => {
  res.json({ message: 'SWE Compass API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
