import { getTeleportDestination } from "../movement.js";
import { canTravelTo } from "../movement.js";
import { calculateFrightenedDirection } from "./frightenedGhostMovement.js"
import { returnSingleGhostToHouse } from "./ghost-utils.js"

export function updateGhosts(gV) {
  const activeGhosts = gV.ghosts.filter((ghost) => ghost.active);
  let ateGhost = false;
  
  // remove active ghosts from the grid so move planning is not order-dependent.
  for (const ghost of activeGhosts) {
    gV.grid[ghost.row][ghost.col] = ghost.underlyingTile;
  }

  // move active ghosts based on their strategy.
  for (const ghost of gV.ghosts) {
    if (!ghost.active) continue;

    const direction = ghost.frightened
    ? calculateFrightenedDirection(ghost, gV.grid)
    : ghost.directionSolver(ghost, gV.grid, gV.pacMan, gV.currentDirection,);
    
    const result = moveGhost(direction, ghost, gV.grid);
    if (!result) continue;

    if (result.hitPacman) {
      return { hitPacman: true, ateGhost: false };
    }

    if (result.eatenByPacman) {
      returnSingleGhostToHouse(ghost, gV);
      ateGhost = true;
      continue;
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
    if (!ghost.active) continue;
    gV.grid[ghost.row][ghost.col] = 2;
  }

  return { hitPacman: false, ateGhost };
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

  const newPosTile = grid[newPos.row]?.[newPos.col];

  return {
    newPos,
    direction,
    hitPacman: newPosTile === 3 && !ghost.frightened,
    eatenByPacman: newPosTile === 3 && ghost.frightened,
  };
}
