// api/assets.js

import express from 'express';
import cors from 'cors';
import assetRoutes from '../routes/assets.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://asset-management-frontend-one.vercel.app',  // your React app, NOT backend port!
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Your API routes
app.use('/api/assets', assetRoutes);

// Export as a serverless function
export default (req, res) => {
  app(req, res);
};

