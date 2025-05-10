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

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'https://asset-management-frontend-one.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'X-Amz-Date', // Important for AWS/Serverless
    'X-Api-Key',
    'X-Amz-Security-Token'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false // Important for Vercel
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Explicit OPTIONS handler for all routes
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(express.json());

// Route-specific CORS headers (double protection)
app.use('/api/assets', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', corsOptions.origin);
  res.header('Access-Control-Allow-Methods', corsOptions.methods.join(','));
  res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}, assetRoutes);

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
