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

// ✅ CORS middleware
const allowedOrigins = ['https://asset-management-frontend-one.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// ✅ Explicit preflight handler (VERY IMPORTANT for Vercel)
app.options('*', cors());

// ✅ JSON middleware
app.use(express.json());

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
