import { moveGhost } from "./ghost-movement.js ";
import { handleDeath } from "../models-health/handle-death.js";
import { resetPositions } from "../game-map/reset-positions.js";


export function updateGhosts(gV) {
    

    for (const ghost of gV.ghosts) {
      const result = moveGhost(ghost, gV.grid, gV.pacMan);
      if (!result) continue;

      if (!result.hitPacman) return;
      const died = handleDeath(gV.pacmanHealth, gV.healthUI);

      if (died) {
        gV.isGameOver = true;
        return;
      }
      resetPositions(gV);

      gV.grid[ghost.row][ghost.col] = 0;
      ghost.row = result.newPos.row;
      ghost.col = result.newPos.col;
      gV.grid[ghost.row][ghost.col] = 2;
      ghost.lastDirection = result.direction;
    }
  }
