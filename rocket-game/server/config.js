// config.js

/**
 * This configuration file sets up environment variables for the Node.js server,
 * including the port number and any other necessary settings for the server to run.
 * It exports a configuration object that can be imported by other server-side files,
 * such as app.js, to use these settings.
 */

// Use dotenv package to load environment variables from a .env file into process.env
require('dotenv').config();

const config = {
  // Server port
  port: process.env.PORT || 3000,
  // Any other configuration variables can be added here
};

module.exports = config;