import { HealthCounter } from "./models-health/health-counter.js";
import { HealthCounterUI } from "./models-health/health-counter-ui.js";
import {
  movePacman,
  keyToDirection,
  resolveDirection,
} from "./models-movement/pacman-movement.js";
import { moveGhost } from "./models-movement/ghost-movement.js";
import { drawBoard } from "./game-map/draw-board.js";
import {
  pacMan,
  ghosts,
  ghostStartPositions,
} from "./game-map/starting-elements.js";
import { grids } from "./game-map/Grid-System/grids.js";
import { getGrid } from "./game-map/Grid-System/gridLoader.js";
import {
  eatCoinAtPosition,
  countCoinsRemaining,
} from "./game-map/Grid-System/coinGrid.js";
import {
  createScoreState,
  collectCoin,
  advanceLevel,
  resetScoreState,
  STARTING_LEVEL,
} from "./score-logic/scoreCalculator.js";
import { shouldLevelUp, getSpeedForLevel } from "./score-logic/scoreUtil.js";
import { updateStatsDisplay } from "./score-logic/statsDisplay.js";

const BASE_PACMAN_SPEED = 8;
const BASE_GHOST_SPEED = 6;

const scoreState = createScoreState();
let grid = getGrid(scoreState.level, grids, 1);
let isGameOver = false;

let pacmanSpeed = BASE_PACMAN_SPEED;
let ghostSpeed = BASE_GHOST_SPEED;
let lastPacmanMove = 0;
let lastGhostMove = 0;

const pacmanHealth = new HealthCounter(3, 5);
const healthUI = new HealthCounterUI(pacmanHealth, "health-display", {
  style: "hearts",
  animateDamage: true,
});

updateStatsDisplay(scoreState);
drawBoard(grid);

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

  if ((currentTime - lastPacmanMove) / 1000 >= 1 / pacmanSpeed) {
    updatePacman();
    lastPacmanMove = currentTime;
  }

  if ((currentTime - lastGhostMove) / 1000 >= 1 / ghostSpeed) {
    updateGhosts();
    lastGhostMove = currentTime;
  }
}

function updatePacman() {
  currentDirection = resolveDirection(grid, pacMan, currentDirection, nextDirection);

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

  const ateCoin = eatCoinAtPosition(newPacmanPos.row, newPacmanPos.col, grid);

  grid[pacMan.row][pacMan.col] = 0;
  pacMan.row = newPacmanPos.row;
  pacMan.col = newPacmanPos.col;
  grid[pacMan.row][pacMan.col] = 3;

  if (!ateCoin) return;

  collectCoin(scoreState);
  updateStatsDisplay(scoreState);

  if (shouldLevelUp(countCoinsRemaining(grid))) {
    levelUp();
  }
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

function draw() {
  drawBoard(grid);

  const pacmanElement = document.querySelector(".mans");

  if (pacmanElement) {
    if (currentDirection.col === 1) {
      pacmanElement.style.transform = "rotate(0deg)";
    } else if (currentDirection.col === -1) {
      pacmanElement.style.transform = "rotate(180deg)";
    } else if (currentDirection.row === 1) {
      pacmanElement.style.transform = "rotate(90deg)";
    } else if (currentDirection.row === -1) {
      pacmanElement.style.transform = "rotate(270deg)";
    }
  }
}

function levelUp() {
  advanceLevel(scoreState);
  syncSpeeds();
  grid = getGrid(scoreState.level, grids, 1);
  resetPositions();
  updateStatsDisplay(scoreState);
}

function handleDeath() {
  pacmanHealth.takeDamage(1);
  healthUI.animateDamage();
  healthUI.update();
  alert("You died!");

  if (pacmanHealth.isAlive()) {
    resetPositions();
    return;
  }

  isGameOver = true;
  resetPositions();
}

function resetPositions() {
  grid[pacMan.row][pacMan.col] = 0;

  ghosts.forEach((ghost) => {
    grid[ghost.row][ghost.col] = 0;
  });

  pacMan.row = 1;
  pacMan.col = 1;
  grid[pacMan.row][pacMan.col] = 3;

  currentDirection = { row: 0, col: 0 };
  nextDirection = { row: 0, col: 0 };

  resetGhostToCenter();
}

function resetGhostToCenter() {
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].row = ghostStartPositions[i].row;
    ghosts[i].col = ghostStartPositions[i].col;
    ghosts[i].lastDirection = null;
    grid[ghosts[i].row][ghosts[i].col] = 2;
  }
}

function restartGame() {
  pacmanHealth.reset(3);
  healthUI.update();
  isGameOver = false;

  resetScoreState(scoreState);
  syncSpeeds();
  grid = getGrid(scoreState.level, grids, 1);

  resetPositions();
  updateStatsDisplay(scoreState);

  window.requestAnimationFrame(gameLoop);
}

function syncSpeeds() {
  pacmanSpeed = getSpeedForLevel(BASE_PACMAN_SPEED, scoreState.level, STARTING_LEVEL);
  ghostSpeed = getSpeedForLevel(BASE_GHOST_SPEED, scoreState.level, STARTING_LEVEL);
}

window.requestAnimationFrame(gameLoop);
