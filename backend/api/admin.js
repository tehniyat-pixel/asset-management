import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from '../sequelize.js';
import Asset from '../models/Asset.js';

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();

export default async (req, res) => {
  try {
    // Set up AdminJS
    const adminJs = new AdminJS({
      resources: [Asset],
      rootPath: '/admin',
    });

    const router = AdminJSExpress.buildRouter(adminJs);
    app.use(adminJs.options.rootPath, router);

    // Handle request and response
    app(req, res);  // Execute the Express app with the current req/res

  } catch (error) {
    console.error('Error occurred in serverless function:', error); // Log error to the console
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
