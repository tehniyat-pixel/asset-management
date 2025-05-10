
import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import serverless from 'serverless-http';
import cors from 'cors';

import sequelize from '../sequelize.js';
import Asset from '../models/Asset.js';
import assetRoutes from '../routes/assets.js';

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'https://asset-management-frontend-one.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
// ✅ Allow preflight (OPTIONS) requests
app.options('*', cors());
// ✅ 3. JSON body parser
app.use(express.json());

// AdminJS setup
const adminJs = new AdminJS({
  resources: [Asset],
  rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// API routes
app.use('/api/assets', assetRoutes);

// Export serverless function handler
export default serverless(app);
