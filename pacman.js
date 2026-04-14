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



import {movePacman, keyToDirection, resolveDirection,getNextPosition,applyMove} from "./models-movement/pacman-movement.js";
import { updatePacmanPosition } from "./models-movement/update-pacman-position.js";
import { handleDeath } from "./models-health/handle-death.js";
import { resetPositions } from "./game-map/reset-positions.js";
import { updateGhosts } from "./models-movement/update-ghost-positions.js";
import { draw } from "./game-map/draw.js";
import { gV } from "./game-map/Global-Variables/global-variables.js";


document.addEventListener("keydown", (e) => {
  const dir = keyToDirection(e.key);
  if (dir) gV.nextDirection = dir;
});

function gameLoop(currentTime) {
  if (!gV.isGameOver) {
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

  // GHOST TIMER
  if ((currentTime - gV.lastGhostMove) / 1000 >= 1 / gV.ghostSpeed) {
    updateGhosts(gV);
    gV.lastGhostMove = currentTime;
  }
}

// Handle ghost collisions
function handleGhostCollision(pacman, ghosts) {
  if (pacmanGhostCollision(pacman, ghosts)) {
    gV.pacmanHealth.takeDamage(1);
    gV.healthUI.animateDamage();
    gV.healthUI.update();

    if (!gV.pacmanHealth.isAlive()) {
      gV.isGameOver = true;
    }
  }
}




function restartGame() {
  gV.pacmanHealth.reset(3);
  gV.healthUI.update();
  gV.isGameOver = false;

  // Reset the map back to its original state (Victor's area)
  // For now, we will just reset positions
  resetPositions(gV);
  

  // Kick the loop back off!
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop); //starts game loop
