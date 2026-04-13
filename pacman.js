import { HealthCounter } from "./models-health/health-counter.js";
import { HealthCounterUI } from "./models-health/health-counter-ui.js";
import {movePacman, keyToDirection, resolveDirection,getNextPosition,applyMove} from "./models-movement/pacman-movement.js";
import { moveGhost } from "./models-movement/ghost-movement.js";
import { drawBoard } from "./game-map/draw-board.js";
import { board, pacMan, ghosts, ghostStartPositions } from "./game-map/starting-elements.js";
import { grids } from "./game-map/Grid-System/grids.js";
import { getGrid } from "./game-map/Grid-System/gridLoader.js";

let level = 3;
let grid = getGrid(level, grids);
let lives = 3;
let isGameOver = false;

let pacmanSpeed =8;
let ghostSpeed = 6;
let lastPacmanMove =0;
let lastGhostMove =0;



// Create health counter (3 starting lives, max 5)
const pacmanHealth = new HealthCounter(3, 5);

// Create UI with hearts display
const healthUI = new HealthCounterUI(pacmanHealth, "health-display", {
  style: "hearts",
  animateDamage: true,
});

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


  update(currentTime);
  draw();
}

function update(currentTime) {
  if (isGameOver) {
    alert("game over - better luck next time");
    restartGame();
    return;
  }

    // PACMAN TIMER
  if ((currentTime - lastPacmanMove) / 1000 >= 1 / pacmanSpeed) {
    updatePacman();
    lastPacmanMove = currentTime;
  }

  // GHOST TIMER
  if ((currentTime - lastGhostMove) / 1000 >= 1 / ghostSpeed) {
    updateGhosts();
    lastGhostMove = currentTime;
  }

  function updatePacman() {
    currentDirection = resolveDirection(
      grid,
      pacMan,
      currentDirection,
      nextDirection
    );

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
}

function updateGhosts() {
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
}

function draw() {
  drawBoard(grid);

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
