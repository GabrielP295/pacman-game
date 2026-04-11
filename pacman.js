let lives = 3;
let isGameOver = false;
let lastTime = 0;
let gameSpeed = 6;

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
    restartGame();
    return;
  }

  currentDirection = resolveDirection(grid, pacMan, currentDirection, nextDirection);
  const newPacmanPos = movePacman(pacMan, grid, currentDirection.row, currentDirection.col);

  if (grid[newPacmanPos.row]?.[newPacmanPos.col] === 2) {
    handleDeath();
    return;
  }

  grid[pacMan.row][pacMan.col] = 0;
  pacMan.row = newPacmanPos.row;
  pacMan.col = newPacmanPos.col;
  grid[pacMan.row][pacMan.col] = 3;

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

// Gabriel will call this function when a ghost touches Pac-Man
function handleDeath() {
  lives--;
  alert("You died!"); //temp popup to know when dead

  if (lives > 0) {
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
  lives = 3;
  isGameOver = false;

  // Reset the map back to its original state (Victor's area)
  // For now, we will just reset positions
  resetPositions();

  // Kick the loop back off!
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop); //starts game loop
