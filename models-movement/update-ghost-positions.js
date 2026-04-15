import { moveGhost } from "./ghost-movement.js";
import { handleDeath } from "../models-health/handle-death.js";
import { resetPositions } from "../game-map/reset-positions.js";

export function updateGhosts(gV) {
  for (const ghost of gV.ghosts) {
    const result = moveGhost(ghost, gV.grid, gV.pacMan);
    if (!result) continue;

    if (result.hitPacman) {
      const died = handleDeath(gV.pacmanHealth, gV.healthUI);

      if (died) {
        gV.isGameOver = true;
        return;
      }

      resetPositions(gV);
      return;
    }

    const destinationTile = gV.grid[result.newPos.row][result.newPos.col];
    gV.grid[ghost.row][ghost.col] = ghost.underlyingTile;
    ghost.row = result.newPos.row;
    ghost.col = result.newPos.col;
    ghost.underlyingTile = destinationTile;
    gV.grid[ghost.row][ghost.col] = 2;
    ghost.lastDirection = result.direction;
  }
}
