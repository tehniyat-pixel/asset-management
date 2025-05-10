import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from '../sequelize.js';
import Asset from '../models/Asset.js';
import assetRoutes from '../routes/assets.js';

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();

// 1. Apply CORS middleware FIRST
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://asset-management-frontend-one.vercel.app',
    'http://localhost:3000'
  ];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// 2. Body parser
app.use(express.json());

// 3. Your routes
app.post('/api/assets', (req, res) => {
  try {
    // Your asset creation logic
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AdminJS setup
const adminJs = new AdminJS({
  resources: [Asset],
  rootPath: '/admin',
});
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Health check endpoint
app.get('/.well-known/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default serverless(app);
