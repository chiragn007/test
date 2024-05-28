const fs = require('fs');
const path = require('path');

/**
 * Utility functions for handling file uploads and downloads.
 */
class FileUtils {
  /**
   * Saves an uploaded image to a temporary directory.
   * @param {Express.Multer.File} file - The uploaded file object from Multer.
   * @param {string} tempDir - The path to the temporary directory.
   * @returns {Promise<string>} The path to the saved file.
   */
  static saveToTempDir(file, tempDir) {
    return new Promise((resolve, reject) => {
      // Ensure the temporary directory exists
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const tempPath = path.join(tempDir, file.originalname);

      // Move the file to the temporary directory
      fs.writeFile(tempPath, file.buffer, (err) => {
        if (err) {
          reject(`Error saving file to temporary directory: ${err}`);
        } else {
          resolve(tempPath);
        }
      });
    });
  }

  /**
   * Moves a processed image from a temporary directory to a permanent directory.
   * @param {string} tempPath - The path to the file in the temporary directory.
   * @param {string} permDir - The path to the permanent directory.
   * @returns {Promise<string>} The path to the file in the permanent directory.
   */
  static moveToPermDir(tempPath, permDir) {
    return new Promise((resolve, reject) => {
      // Ensure the permanent directory exists
      if (!fs.existsSync(permDir)) {
        fs.mkdirSync(permDir, { recursive: true });
      }

      const fileName = path.basename(tempPath);
      const permPath = path.join(permDir, fileName);

      // Move the file to the permanent directory
      fs.rename(tempPath, permPath, (err) => {
        if (err) {
          reject(`Error moving file to permanent directory: ${err}`);
        } else {
          resolve(permPath);
        }
      });
    });
  }

  /**
   * Serves a file for download.
   * @param {string} filePath - The path to the file to be downloaded.
   * @param {Express.Response} res - The Express response object.
   */
  static serveFile(filePath, res) {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.download(filePath, (err) => {
        if (err) {
          res.status(500).send(`Error serving file for download: ${err}`);
        }
      });
    } else {
      res.status(404).send('File not found');
    }
  }

  /**
   * Cleans up a file from the file system.
   * @param {string} filePath - The path to the file to be deleted.
   * @returns {Promise<void>}
   */
  static cleanupFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(`Error cleaning up file: ${err}`);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = FileUtils;
```