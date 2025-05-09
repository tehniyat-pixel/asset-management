// api/admin.js

import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from '../sequelize.js';
import Asset from '../models/Asset.js';

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();

// AdminJS config
const adminJs = new AdminJS({
  resources: [Asset],
  rootPath: '/admin',
});
const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

// Export as a serverless function
export default (req, res) => {
  app(req, res);
};
