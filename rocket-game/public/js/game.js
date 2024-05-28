// game.js

// Get the canvas element and its context from the HTML document
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Load images
const rocketImg = new Image();
rocketImg.src = 'images/rocket.png';

const cloudImg = new Image();
cloudImg.src = 'images/cloud.png';

// Define the rocket object
const rocket = {
  x: canvas.width / 2 - 32, // Center the rocket on the x-axis
  y: canvas.height - 64, // Position the rocket near the bottom of the canvas
  width: 64,
  height: 64,
  speed: 5,
  dx: 0 // Change in x (used for moving left/right)
};

// Define clouds as an array to store multiple clouds
const clouds = [];
const cloudSpeed = 2;
const cloudFrequency = 90; // How often to add a new cloud (in frames)

// Game state
let isGameOver = false;
let score = 0;
let frames = 0;

// Function to draw the rocket
function drawRocket() {
  ctx.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);
}

// Function to update the rocket's position
function updateRocket() {
  rocket.x += rocket.dx;

  // Prevent the rocket from moving out of the canvas
  if (rocket.x < 0) {
    rocket.x = 0;
  }
  if (rocket.x + rocket.width > canvas.width) {
    rocket.x = canvas.width - rocket.width;
  }
}

// Function to draw clouds
function drawClouds() {
  clouds.forEach(function(cloud) {
    ctx.drawImage(cloudImg, cloud.x, cloud.y, cloud.width, cloud.height);
  });
}

// Function to update cloud positions
function updateClouds() {
  clouds.forEach(function(cloud, index) {
    cloud.y += cloudSpeed;

    // Remove clouds that have moved off the bottom of the canvas
    if (cloud.y > canvas.height) {
      clouds.splice(index, 1);
      score++;
    }
  });

  // Add a new cloud periodically
  if (frames % cloudFrequency === 0) {
    clouds.push({
      x: Math.random() * (canvas.width - 64),
      y: -64,
      width: 64,
      height: 64
    });
  }
}

// Function to check for collisions between the rocket and clouds
function checkCollisions() {
  clouds.forEach(function(cloud) {
    if (rocket.x < cloud.x + cloud.width &&
        rocket.x + rocket.width > cloud.x &&
        rocket.y < cloud.y + cloud.height &&
        rocket.y + rocket.height > cloud.y) {
      // Collision detected
      isGameOver = true;
    }
  });
}

// Function to display the score
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText('Score: ' + score, 10, 30);
}

// Function to display the game over message
function gameOver() {
  ctx.font = '40px Arial';
  ctx.fillStyle = '#f00';
  ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
}

// Function to clear the canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Main game function to reset and restart
function resetGame() {
  isGameOver = false;
  score = 0;
  frames = 0;
  rocket.x = canvas.width / 2 - 32;
  rocket.y = canvas.height - 64;
  clouds.length = 0; // Clear the clouds array
  gameLoop();
}

// Function to exit the game (Placeholder for actual functionality)
function exitGame() {
  // Placeholder for exiting the game, e.g., navigating to another page
  window.location.href = '/'; // Assuming the root of the site is the exit point
}

// Main game loop
function gameLoop() {
  if (!isGameOver) {
    clear();
    drawRocket();
    updateRocket();
    drawClouds();
    updateClouds();
    checkCollisions();
    drawScore();
    frames++;
    requestAnimationFrame(gameLoop);
  } else {
    gameOver();
  }
}

// Event listeners for keyboard input
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'd') {
    rocket.dx = rocket.speed;
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    rocket.dx = -rocket.speed;
  }
});

document.addEventListener('keyup', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'a') {
    rocket.dx = 0;
  }
});

// Event listeners for game control buttons
document.getElementById('restartGameButton').addEventListener('click', resetGame);
document.getElementById('exitGameButton').addEventListener('click', exitGame);

// Start the game
gameLoop();