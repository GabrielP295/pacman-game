let lives = 3;
let isGameOver = false;
let lastTime = 0;
let gameSpeed = 6;

function gameLoop(currentTime) {
  if (!isGameOver) {
    window.requestAnimationFrame(gameLoop);
  }

  const secondsSinceLastRender = (currentTime - lastTime) / 1000;
  if (secondsSinceLastRender < 1 / gameSpeed) return;
  
  lastTime = currentTime;

  update();
  draw();
}

function update() {
  if (isGameOver) return;

  movePacman();
  
  //I believe Gabriel will be writing this function with the implementation of ghosts.
//   checkCollisions(); 
}

function draw() {
  drawBoard();
  
  const pacmanElement = document.querySelector(".mans");

  if (pacmanElement) {
    if (currentDirection.col === 1) {
      pacmanElement.style.transform = "rotate(0deg)"; // Facing Right (Default)
    } else if (currentDirection.col === -1) {
      pacmanElement.style.transform = "rotate(180deg)"; // Facing Left
    } else if (currentDirection.row === 1) {
      pacmanElement.style.transform = "rotate(90deg)"; // Facing Down
    } else if (currentDirection.row === -1) {
      pacmanElement.style.transform = "rotate(270deg)"; // Facing Up
    }
  }
}

// Gabriel will call this function when a ghost touches Pac-Man
function handleDeath() {
  lives--;
  
  if (lives <= 0) {
    isGameOver = true;
    console.log("Game Over!");
    // Cameron can plug in his UI code here later, e.g., showGameOverScreen()
  } else {
    resetPositions();
  }
}

// Resets entities to their starting spots without resetting the score/coins
function resetPositions() {
  // 1. Clear Pac-Man's current spot on the grid
  grid[pacMan.row][pacMan.col] = 0; 
  
  // 2. Put Pac-Man back at the start
  pacMan.row = 1; 
  pacMan.col = 1;
  grid[pacMan.row][pacMan.col] = 3;
  
  // 3. Reset the direction so he doesn't immediately run into a wall
  currentDirection = { row: 0, col: 0 };
  nextDirection = { row: 0, col: 0 };

  // Gabriel will add code here later to reset the ghosts to the center box
}

function restartGame() {
  lives = 3;
  isGameOver = false;
  
  // Reset the map back to its original state (Victor's area)
  // For now, we will just reset positions
  resetPositions();
  
  // Kick the loop back off!
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);