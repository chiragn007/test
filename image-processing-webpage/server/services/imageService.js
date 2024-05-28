// Importing the Sharp library for image processing
const sharp = require('sharp');
// Importing file utilities for handling file operations
const fileUtils = require('./utils/fileUtils');

/**
 * Processes an image according to the specified options.
 * @param {string} inputPath - The path to the input image.
 * @param {Object} options - The processing options.
 * @param {string} outputPath - The path to save the processed image.
 * @returns {Promise<string>} A promise that resolves with the path to the processed image.
 */
const processImage = async (inputPath, options, outputPath) => {
  try {
    let image = sharp(inputPath);

    // Check and apply crop options
    if (options.crop) {
      image = image.extract({ width: options.crop.width, height: options.crop.height, left: options.crop.x, top: options.crop.y });
    }

    // Check and apply resize options
    if (options.resize) {
      image = image.resize(options.resize.width, options.resize.height);
    }

    // Convert to greyscale if specified
    if (options.greyscale) {
      image = image.grayscale();
    }

    // Save the processed image to the specified output path
    await image.toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

/**
 * Generates a GIF from a sequence of images.
 * @param {Array<string>} imagePaths - An array of paths to the input images.
 * @param {string} outputPath - The path to save the generated GIF.
 * @returns {Promise<string>} A promise that resolves with the path to the generated GIF.
 */
const generateGIF = async (imagePaths, outputPath) => {
  console.log('Generating GIF from images:', imagePaths);
  // Simulate GIF generation
  // Replace the simulateAsyncProcess with cleanupFile after GIF generation for demonstration purposes
  await fileUtils.cleanupFile(outputPath); // Simulating the process as actual GIF generation logic isn't specified
  return outputPath;
};

/**
 * Generates an MP4 slideshow from a sequence of images.
 * @param {Array<string>} imagePaths - An array of paths to the input images.
 * @param {string} outputPath - The path to save the generated MP4.
 * @returns {Promise<string>} A promise that resolves with the path to the generated MP4.
 */
const generateMP4Slideshow = async (imagePaths, outputPath) => {
  console.log('Generating MP4 slideshow from images:', imagePaths);
  // Simulate MP4 generation
  // Replace the simulateAsyncProcess with cleanupFile after MP4 generation for demonstration purposes
  await fileUtils.cleanupFile(outputPath); // Simulating the process as actual MP4 generation logic isn't specified
  return outputPath;
};

module.exports = {
  processImage,
  generateGIF,
  generateMP4Slideshow
};