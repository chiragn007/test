const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Importing the image processing routes
const imageRoutes = require('./routes/imageRoutes');

// Initialize the Express app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Use the image processing routes
app.use('/api', imageRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```