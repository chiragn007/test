// Importing necessary modules
const express = require('express');
const path = require('path');

// Importing configurations and routes
const config = require('./config');
const gameRoutes = require('./routes/gameRoutes');

// Initializing the Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serving static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Using game routes
app.use('/api', gameRoutes);

// Catch-all handler for any requests that don't match our routes
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Starting the server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```