// gameController.js

let highScores = []; // This will store high score entries as { name: string, score: number }

const addHighScore = (req, res) => {
    const { name, score } = req.body;

    if (!name || typeof score !== 'number' || score <= 0) {
        return res.status(400).json({ message: "Name and score are required, and score must be a number greater than zero." });
    }

    try {
        const newScore = { name, score: Number(score) };
        highScores.push(newScore);

        // Sort the high scores in descending order
        highScores.sort((a, b) => b.score - a.score);

        // Limit the high scores to the top 10
        highScores = highScores.slice(0, 10);

        res.status(201).json(newScore);
    } catch (error) {
        console.error('Error adding high score:', error);
        res.status(500).json({ message: "Failed to add high score." });
    }
};

const getHighScores = (req, res) => {
    try {
        res.status(200).json(highScores);
    } catch (error) {
        console.error('Error retrieving high scores:', error);
        res.status(500).json({ message: "Failed to retrieve high scores." });
    }
};

const resetHighScores = (req, res) => {
    try {
        highScores = [];
        res.status(200).json({ message: "High scores have been reset." });
    } catch (error) {
        console.error('Error resetting high scores:', error);
        res.status(500).json({ message: "Failed to reset high scores." });
    }
};

const updateGameSettings = (req, res) => {
    try {
        res.status(200).json({ message: "Game settings updated." });
    } catch (error) {
        console.error('Error updating game settings:', error);
        res.status(500).json({ message: "Failed to update game settings." });
    }
};

module.exports = {
    addHighScore,
    getHighScores,
    resetHighScores,
    updateGameSettings
};