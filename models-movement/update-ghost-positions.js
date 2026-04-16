import { getTeleportDestination } from "./movement.js";

export function updateGhosts(gV) {
  for (const ghost of gV.ghosts) {
    if (!ghost.active) continue;

    const direction = ghost.directionSolver(ghost, gV.grid, gV.pacMan);
    const result = moveGhost(direction, ghost, gV.grid);
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

export function moveGhost(direction, ghost, grid) {
  if (!direction) return null;

  const nextRow = ghost.row + direction.row;
  const nextCol = ghost.col + direction.col;

  const newPos = getTeleportDestination(grid, nextRow, nextCol, direction) ?? {
    row: nextRow,
    col: nextCol,
  };

  return {
    newPos,
    direction,
    hitPacman: grid[newPos.row]?.[newPos.col] === 3,
  };
}
