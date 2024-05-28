const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Define the route for getting the high scores
router.get('/highscores', async (req, res) => {
    try {
        const highScores = await gameController.getHighScores();
        res.json(highScores);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving high scores", error: error.message });
    }
});

// Define the route for posting a new high score
router.post('/highscore', async (req, res) => {
    try {
        const { name, score } = req.body;
        if (!name || !score) {
            return res.status(400).json({ message: "Name and score are required" });
        }
        const newHighScore = await gameController.addHighScore(name, score);
        res.status(201).json(newHighScore);
    } catch (error) {
        res.status(500).json({ message: "Error saving high score", error: error.message });
    }
});

// Define the route for getting game settings
router.get('/settings', async (req, res) => {
    try {
        const settings = await gameController.getGameSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving game settings", error: error.message });
    }
});

// Define the route for updating game settings
router.post('/settings', async (req, res) => {
    try {
        const settings = req.body;
        const updatedSettings = await gameController.updateGameSettings(settings);
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: "Error updating game settings", error: error.message });
    }
});

// Define the route for resetting high scores
router.post('/resetHighScores', async (req, res) => {
    try {
        const message = await gameController.resetHighScores();
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Error resetting high scores", error: error.message });
    }
});

module.exports = router;