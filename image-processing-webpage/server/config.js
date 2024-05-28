// config.js

/**
 * This configuration file sets up environment variables and other configuration settings for the application.
 * It includes settings such as the port number for the server, file storage paths for uploaded and processed images,
 * and any other necessary configuration options.
 */

const path = require('path');

const config = {
  // Server port configuration
  port: process.env.PORT || 3000,

  // File storage paths
  storagePaths: {
    uploadPath: path.join(__dirname, '..', 'public', 'uploads'),
    processedPath: path.join(__dirname, '..', 'public', 'processed'),
  },

  // Other application-wide settings can be defined here
  // Example: Database configuration settings
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'image_processing',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
  },

  // Security settings like CORS or JWT secrets
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
    corsOptions: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
    },
  },
};

module.exports = config;