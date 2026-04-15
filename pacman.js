import { keyToDirection } from "./models-movement/pacman-movement.js";
import { updatePacmanPosition } from "./models-movement/update-pacman-position.js";
import { handleDeath } from "./models-health/handle-death.js";
import { resetPositions } from "./game-map/reset-positions.js";
import { updateGhosts } from "./models-movement/update-ghost-positions.js";
import { draw } from "./game-map/draw.js";
import { gV } from "./game-map/Global-Variables/global-variables.js";
import { getGrid } from "./game-map/Grid-System/gridLoader.js";
import { grids } from "./game-map/Grid-System/grids.js";
import { countCoinsIncludingGhosts } from "./game-map/Grid-System/coinGrid.js";
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

const scoreState = createScoreState(gV.level);

syncSpeeds();
updateStatsDisplay(scoreState);
draw(gV);

document.addEventListener("keydown", (e) => {
  const dir = keyToDirection(e.key);
  if (dir) gV.nextDirection = dir;
});

function gameLoop(currentTime) {
  if (!gV.isGameOver) {
    window.requestAnimationFrame(gameLoop);
  }

  update(currentTime);
  draw(gV);
}

function update(currentTime) {
  if (gV.isGameOver) {
    alert("game over - better luck next time");
    restartGame();
    return;
  }

  if ((currentTime - gV.lastPacmanMove) / 1000 >= 1 / gV.pacmanSpeed) {
    const result = updatePacmanPosition(
      gV.grid,
      gV.pacMan,
      gV.currentDirection,
      gV.nextDirection,
    );

    if (result.hitGhost) {
      const died = handleDeath(gV.pacmanHealth, gV.healthUI);

      if (died) {
        gV.isGameOver = true;
        return;
      }

      resetPositions(gV);
    } else if (result.ateCoin) {
      collectCoin(scoreState);
      updateStatsDisplay(scoreState);

      if (shouldLevelUp(countCoinsIncludingGhosts(gV.grid, gV.ghosts))) {
        levelUp();
      }
    }

    gV.lastPacmanMove = currentTime;
  }

  if ((currentTime - gV.lastGhostMove) / 1000 >= 1 / gV.ghostSpeed) {
    updateGhosts(gV);
    gV.lastGhostMove = currentTime;
  }
}

function levelUp() {
  advanceLevel(scoreState);
  gV.level = scoreState.level;
  syncSpeeds();
  gV.grid = getGrid(scoreState.level, grids, 1);
  resetPositions(gV);
  updateStatsDisplay(scoreState);
}

function restartGame() {
  gV.pacmanHealth.reset(3);
  gV.healthUI.update();
  gV.isGameOver = false;

  resetScoreState(scoreState, STARTING_LEVEL);
  gV.level = scoreState.level;
  gV.lastPacmanMove = 0;
  gV.lastGhostMove = 0;
  syncSpeeds();
  gV.grid = getGrid(scoreState.level, grids, 1);

  resetPositions(gV);
  updateStatsDisplay(scoreState);

  window.requestAnimationFrame(gameLoop);
}

function syncSpeeds() {
  gV.pacmanSpeed = getSpeedForLevel(
    BASE_PACMAN_SPEED,
    scoreState.level,
    STARTING_LEVEL,
  );
  gV.ghostSpeed = getSpeedForLevel(
    BASE_GHOST_SPEED,
    scoreState.level,
    STARTING_LEVEL,
  );
}

window.requestAnimationFrame(gameLoop);
