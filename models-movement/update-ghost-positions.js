import { moveGhost } from "./ghost-movement.js";

export function updateGhosts(gV) {
  for (const ghost of gV.ghosts) {
    if (!ghost.active) continue;

    const result = moveGhost(ghost, gV.grid, gV.pacMan);
    if (!result) continue;

    if (result.hitPacman) {
      return { hitPacman: true };
    }

    const destinationTile = gV.grid[result.newPos.row][result.newPos.col];
    gV.grid[ghost.row][ghost.col] = ghost.underlyingTile;
    ghost.row = result.newPos.row;
    ghost.col = result.newPos.col;
    ghost.underlyingTile = destinationTile;
    gV.grid[ghost.row][ghost.col] = 2;
    ghost.lastDirection = result.direction;
  }

  return { hitPacman: false };
}
