import { getTeleportDestination } from "../movement.js";
import { canTravelTo } from "../movement.js";

export function updateGhosts(gV) {
  const activeGhosts = gV.ghosts.filter((ghost) => ghost.active);

  // remove active ghosts from the grid so move planning is not order-dependent.
  for (const ghost of activeGhosts) {
    gV.grid[ghost.row][ghost.col] = ghost.underlyingTile;
  }

  // move active ghosts based on their strategy.
  for (const ghost of gV.ghosts) {
    if (!ghost.active) continue;

    const direction = ghost.directionSolver(
      ghost,
      gV.grid,
      gV.pacMan,
      gV.currentDirection,
    );
    const result = moveGhost(direction, ghost, gV.grid);
    if (!result) continue;

    if (result.hitPacman) {
      return { hitPacman: true };
    }

    ghost.row = result.newPos.row;
    ghost.col = result.newPos.col;
    ghost.lastDirection = result.direction;
  }

  // refresh underlying tiles from the ghost-free grid, then paint ghosts.
  for (const ghost of activeGhosts) {
    ghost.underlyingTile = gV.grid[ghost.row][ghost.col];
  }
  for (const ghost of activeGhosts) {
    gV.grid[ghost.row][ghost.col] = 2;
  }

  return { hitPacman: false };
}

export function moveGhost(direction, ghost, grid) {
  if (!direction) return null;

  const nextRow = ghost.row + direction.row;
  const nextCol = ghost.col + direction.col;

  if (!canTravelTo(grid, nextRow, nextCol)) {
    return null;
  }

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
