import { keyToDirection } from "./models-movement/pacman-movement.js";
import { updatePacmanPosition } from "./models-movement/update-pacman-position.js";
import { handleDeath } from "./models-health/handle-death.js";
import { resetPositions } from "./game-map/reset-positions.js";
import { updateGhosts } from "./models-movement/ghost-movement/update-ghost-positions.js";
import { updateGhostRelease } from "./models-movement/ghost-movement/ghost-release.js";
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
import { createDefaultCoinAudioController } from "./audio-manager/sound-effects/coin/coin-audio-setup.js";
import { showModal } from "./game-modal.js";

const BASE_PACMAN_SPEED = 8;
const BASE_GHOST_SPEED = 6;

const scoreState = createScoreState(gV.level);
const coinAudio = createDefaultCoinAudioController();
let paused = false;

syncSpeeds();
updateStatsDisplay(scoreState);
draw(gV);

document.addEventListener("keydown", (e) => {
  const dir = keyToDirection(e.key);
  if (dir) gV.nextDirection = dir;
});

const bgMusic = document.getElementById("doomsoundtrack");
bgMusic.volume = 0.3;

window.addEventListener(
  "keydown",
  () => {
    bgMusic.play().catch((error) => {
      console.log("Audio play blocked by browser:", error);
    });
  },
  { once: true },
);

function gameLoop(currentTime) {
  if (!gV.isGameOver) {
    window.requestAnimationFrame(gameLoop);
  }

  update(currentTime);
  draw(gV);
}

function update(currentTime) {
  if (paused) return;

  if (gV.isGameOver) {
    paused = true;
    showModal("Game Over!", "Play Again", { showLeaderboard: true }).then(
      () => {
        restartGame();
        paused = false;
      },
    );
    return;
  }

  updateGhostRelease(gV, currentTime);

  if ((currentTime - gV.lastPacmanMove) / 1000 >= 1 / gV.pacmanSpeed) {
    const result = updatePacmanPosition(
      gV.grid,
      gV.pacMan,
      gV.currentDirection,
      gV.nextDirection,
    );

    if (result.hitGhost) {
      paused = true;
      handleDeath(gV.pacmanHealth, gV.healthUI).then((died) => {
        if (died) {
          gV.isGameOver = true;
        } else {
          resetPositions(gV);
        }
        paused = false;
      });
      return;
    } else if (result.ateCoin) {
      collectCoin(scoreState);
      coinAudio.registerCoinCollected();
      updateStatsDisplay(scoreState);

      if (shouldLevelUp(countCoinsIncludingGhosts(gV.grid, gV.ghosts))) {
        levelUp();
      }
    }

    gV.lastPacmanMove = currentTime;
  }

  if ((currentTime - gV.lastGhostMove) / 1000 >= 1 / gV.ghostSpeed) {
    const ghostResult = updateGhosts(gV);
    if (ghostResult.hitPacman) {
      paused = true;
      handleDeath(gV.pacmanHealth, gV.healthUI).then((died) => {
        if (died) {
          gV.isGameOver = true;
        } else {
          resetPositions(gV);
        }
        paused = false;
      });
      return;
    }
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
  coinAudio.reset();
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

export function startGame() {
  window.requestAnimationFrame(gameLoop);
}
