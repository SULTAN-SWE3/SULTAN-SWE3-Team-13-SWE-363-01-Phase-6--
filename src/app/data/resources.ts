export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  type: 'video' | 'article' | 'book' | 'link';
  rating: number;
  duration?: string;
};

export const resources: Resource[] = [
  {
    id: 'resource-architecture-guide',
    title: 'Software Architecture Study Guide',
    description: 'A concise overview of architectural styles, quality attributes, and design tradeoffs.',
    category: 'Software Design',
    author: 'SWE Club',
    type: 'article',
    rating: 4.8,
    duration: '18 min read',
  },
  {
    id: 'resource-requirements-notes',
    title: 'Requirements Engineering Notes',
    description: 'Lecture notes covering elicitation, use cases, validation, and traceability.',
    category: 'Requirements',
    author: 'Abdullah Alzahrani',
    type: 'book',
    rating: 4.7,
    duration: '32 pages',
  },
  {
    id: 'resource-testing-video',
    title: 'Unit Testing and Coverage Workshop',
    description: 'Recorded workshop explaining test doubles, coverage goals, and regression checks.',
    category: 'Testing',
    author: 'KFUPM SWE Lab',
    type: 'video',
    rating: 4.9,
    duration: '42 min',
  },
  {
    id: 'resource-db-cheatsheet',
    title: 'Database Design Cheat Sheet',
    description: 'Quick reference for ER modeling, normalization, indexing, and SQL joins.',
    category: 'Databases',
    author: 'Amin Srraj',
    type: 'link',
    rating: 4.6,
    duration: 'Reference',
  },
  {
    id: 'resource-algorithms-review',
    title: 'Algorithms Midterm Review',
    description: 'Practice problems for complexity, recursion, graphs, and dynamic programming.',
    category: 'Algorithms',
    author: 'Waleed Almehmadi',
    type: 'article',
    rating: 4.5,
    duration: '25 min read',
  },
  {
    id: 'resource-project-management',
    title: 'Agile Project Planning Template',
    description: 'Reusable template for sprint goals, backlog refinement, and team responsibilities.',
    category: 'Project Management',
    author: 'Aseel Bawazir',
    type: 'link',
    rating: 4.7,
    duration: 'Template',
  },
];
