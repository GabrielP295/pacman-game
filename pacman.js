let lives = 3;
let isGameOver = false;
let lastTime = 0;
let gameSpeed = 6;

// Coin and score tracking variables
let score = 0;
let level = 1;
let coinsEaten = 0;
let totalCoinsOnMap = 100;

// Create health counter (3 starting lives, max 5)
const pacmanHealth = new HealthCounter(3, 5);

// Create UI with hearts display
const healthUI = new HealthCounterUI(pacmanHealth, "health-display", {
  style: "hearts",
  animateDamage: true,
});

// Initialize score display
updateScoreDisplay();

// Initialize the grid with coins for the first level
const initialGridWithCoins = getGrid(level, grids, 1);
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        grid[row][col] = initialGridWithCoins[row][col];
    }
}

// Redraw the board with coins
drawBoard();

let currentDirection = { row: 0, col: 0 };
let nextDirection = { row: 0, col: 0 };

document.addEventListener("keydown", (e) => {
  const dir = keyToDirection(e.key);
  if (dir) nextDirection = dir;
});

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
  if (isGameOver) {
    alert("game over - better luck next time");
    restartGame();
    return;
  }

  currentDirection = resolveDirection(
    grid,
    pacMan,
    currentDirection,
    nextDirection,
  );
  const newPacmanPos = movePacman(
    pacMan,
    grid,
    currentDirection.row,
    currentDirection.col,
  );

  if (grid[newPacmanPos.row]?.[newPacmanPos.col] === 2) {
    handleDeath();
    return;
  }

  grid[pacMan.row][pacMan.col] = 0;
  pacMan.row = newPacmanPos.row;
  pacMan.col = newPacmanPos.col;
  grid[pacMan.row][pacMan.col] = 3;

  // Check if Pac-Man ate a coin and update score
  if (eatCoinAtPosition(pacMan.row, pacMan.col, grid)) {
    score += 10;  // Add 10 points per coin
    coinsEaten++;
    updateScoreDisplay();
    
    // Check if all coins are eaten (level win condition)
    const coinsRemaining = countCoinsRemaining(grid);
    if (coinsRemaining === 0) {
      levelUp();
    }
  }

  for (const ghost of ghosts) {
    const result = moveGhost(ghost, grid, pacMan);
    if (!result) continue;

    if (result.hitPacman) {
      handleDeath();
      return;
    }

    grid[ghost.row][ghost.col] = 0;
    ghost.row = result.newPos.row;
    ghost.col = result.newPos.col;
    grid[ghost.row][ghost.col] = 2;
    ghost.lastDirection = result.direction;
  }
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

// Update the score and level display on the page
function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("score-display");
  const levelDisplay = document.getElementById("level-display");
  
  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${score}`;
  }
  if (levelDisplay) {
    levelDisplay.textContent = `Level: ${level}`;
  }
}

// Handle level up: increase speed, load new grid with coins
function levelUp() {
  level++;
  coinsEaten = 0;
  gameSpeed = 6 + (level - 1);  // Increase speed each level
  
  // Load new grid with coins
  const newGridWithCoins = getGrid(level, grids, 1);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col] = newGridWithCoins[row][col];
    }
  }
  
  // Reset Pac-Man position
  grid[pacMan.row][pacMan.col] = 0;
  pacMan.row = 1;
  pacMan.col = 1;
  grid[pacMan.row][pacMan.col] = 3;
  
  updateScoreDisplay();
  console.log(`Level Up! Now on Level ${level} with speed ${gameSpeed}`);
}

// Handle ghost collisions
function handleGhostCollision(pacman, ghosts) {
  if (pacmanGhostCollision(pacman, ghosts)) {
    pacmanHealth.takeDamage(1);
    healthUI.animateDamage();
    healthUI.update();

    if (!pacmanHealth.isAlive()) {
      endGame();
    }
  }
}

// Gabriel will call this function when a ghost touches Pac-Man
function handleDeath() {
  pacmanHealth.takeDamage(1);
  healthUI.animateDamage();
  healthUI.update();
  alert("You died!"); //temp popup to know when dead

  if (pacmanHealth.isAlive()) {
    resetPositions();
    return;
  }

  isGameOver = true;
  resetPositions();
  // Cameron can plug in his UI code here later, e.g., showGameOverScreen()
}

// Resets entities to their starting spots without resetting the score/coins
function resetPositions() {
  // 1. Clear Pac-Man's current spot on the grid
  grid[pacMan.row][pacMan.col] = 0;

  // Delete ghosts from current position on the grid
  ghosts.forEach((ghost) => {
    grid[ghost.row][ghost.col] = 0;
  });

  // 2. Put Pac-Man back at the start
  pacMan.row = 1;
  pacMan.col = 1;
  grid[pacMan.row][pacMan.col] = 3;

  // 3. Reset the direction so he doesn't immediately run into a wall
  currentDirection = { row: 0, col: 0 };
  nextDirection = { row: 0, col: 0 };

  // 4. Reset the ghosts to the center box
  resetGhostToCenter();
}

function resetGhostToCenter() {
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].row = ghostStartPositions[i].row;
    ghosts[i].col = ghostStartPositions[i].col;
    grid[ghosts[i].row][ghosts[i].col] = 2;
  }
}

function restartGame() {
  pacmanHealth.reset(3);
  healthUI.update();
  isGameOver = false;

  // Reset the map back to its original state (Victor's area)
  // For now, we will just reset positions
  resetPositions();

  // Kick the loop back off!
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop); //starts game loop
