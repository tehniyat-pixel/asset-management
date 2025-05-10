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

// ✅ Enhanced CORS configuration
const allowedOrigins = [
  'https://asset-management-frontend-one.vercel.app',
  'http://localhost:3000' // for local development
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// ✅ AdminJS setup
const adminJs = new AdminJS({
  resources: [Asset],
  rootPath: '/admin',
});
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// ✅ API routes
app.use('/api/assets', assetRoutes);

// ✅ Export as serverless function
export default serverless(app);
