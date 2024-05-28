const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route for uploading images
router.post('/upload', imageController.uploadImage);

// Route for processing images (e.g., resize, crop, convert)
router.post('/process', imageController.processImage);

// Route for downloading processed images, now using a query parameter
router.get('/download', imageController.downloadImage);

module.exports = router;