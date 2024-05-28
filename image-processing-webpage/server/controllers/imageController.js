const imageService = require('./imageService');
const fileUtils = require('./fileUtils');

/**
 * Handles the uploading of images.
 * @param {object} req - The request object from Express.js
 * @param {object} res - The response object from Express.js
 */
exports.uploadImage = async (req, res) => {
    try {
        // Validate the request
        if (!req.file) {
            return res.status(400).send({ message: 'No image file provided.' });
        }

        // Save the uploaded image to disk
        const tempDir = './temp'; // Assuming temp directory is in the current working directory
        const savedImagePath = await fileUtils.saveToTempDir(req.file, tempDir);

        // Respond with the path of the saved image
        res.status(200).send({ path: savedImagePath });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({ message: 'Failed to upload image.' });
    }
};

/**
 * Processes the image according to the specified options.
 * @param {object} req - The request object from Express.js
 * @param {object} res - The response object from Express.js
 */
exports.processImage = async (req, res) => {
    try {
        // Validate the request
        const { path, options } = req.body;
        if (!path || !options) {
            return res.status(400).send({ message: 'Invalid request data.' });
        }

        // Implementing logic to check for specific processing options (e.g., generating GIFs or MP4s)
        let processedImagePath;
        if (options.type === 'GIF') {
            processedImagePath = await imageService.generateGIF(path, options);
        } else if (options.type === 'MP4') {
            processedImagePath = await imageService.generateMP4Slideshow(path, options);
        } else {
            // Process the image with given options for other processing types
            processedImagePath = await imageService.processImage(path, options);
        }

        // Respond with the path of the processed image
        res.status(200).send({ path: processedImagePath });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send({ message: 'Failed to process image.' });
    }
};

/**
 * Serves the processed image for download.
 * @param {object} req - The request object from Express.js
 * @param {object} res - The response object from Express.js
 */
exports.downloadImage = async (req, res) => {
    try {
        // Validate the request
        const { path } = req.query;
        if (!path) {
            return res.status(400).send({ message: 'No image path provided.' });
        }

        // Serve the image for download
        await fileUtils.serveFile(path, res);
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).send({ message: 'Failed to download image.' });
    }
};