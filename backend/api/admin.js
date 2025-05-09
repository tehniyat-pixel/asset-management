// api/admin.js

import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from '../sequelize.js';
import Asset from '../models/Asset.js';

AdminJS.registerAdapter(AdminJSSequelize);

// Serverless function
export default async (req, res) => {
  const app = express();

  const adminJs = new AdminJS({
    resources: [Asset],
    rootPath: '/admin',
  });

  const router = AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);

  app(req, res);
};
