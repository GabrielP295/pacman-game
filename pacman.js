
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
  draw(gV);
}

function update(currentTime) {
  if (gV.isGameOver) {
    alert("game over - better luck next time");
    restartGame();
    return;
  }

    // PACMAN TIMER
  if ((currentTime - gV.lastPacmanMove) / 1000 >= 1 / gV.pacmanSpeed) {
    //if updatePacmanPosition returns true, that means pacman collided with a ghost and we should handle death  
    if(updatePacmanPosition(gV.grid, gV.pacMan, gV.currentDirection, gV.nextDirection)===true) {
      const died = handleDeath(gV.pacmanHealth, gV.healthUI);

      if (died) {
        gV.isGameOver = true;
        return;
      }

      resetPositions(gV);
    } 
    gV.lastPacmanMove = currentTime;
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
