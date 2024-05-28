// server.js
// Importing the necessary module
const express = require('express');

// Creating an instance of express
const app = express();

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from 'public/' directory
app.use(express.static('public'));

// Basic routing - serving the 'index.html' file when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Starting the server and listening for requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```