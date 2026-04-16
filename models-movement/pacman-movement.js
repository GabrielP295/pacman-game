import { canTravelTo, getTeleportDestination } from "./movement.js";

export function movePacman(pacman, grid, rowToAdd, colToAdd) {
  return getNextPosition(grid, pacman, { row: rowToAdd, col: colToAdd });
}

export function keyToDirection(key) {
  const directionMap = {
    ArrowUp: { row: -1, col: 0 },
    ArrowDown: { row: 1, col: 0 },
    ArrowLeft: { row: 0, col: -1 },
    ArrowRight: { row: 0, col: 1 },
  };
  return directionMap[key] || null;
}

export function resolveDirection(
  grid,
  pacMan,
  currentDirection,
  nextDirection,
) {
  const nextRow = pacMan.row + nextDirection.row;
  const nextCol = pacMan.col + nextDirection.col;

  if (canTravelTo(grid, nextRow, nextCol)) {
    return { ...nextDirection };
  }
  return { ...currentDirection };
}

export function getNextPosition(grid, pacMan, direction) {
  const moveRow = pacMan.row + direction.row;
  const moveCol = pacMan.col + direction.col;

  if (!canTravelTo(grid, moveRow, moveCol)) {
    return { row: pacMan.row, col: pacMan.col };
  }

  return (
    getTeleportDestination(grid, moveRow, moveCol, direction) ?? {
      row: moveRow,
      col: moveCol,
    }
  );
}

export function applyMove(grid, oldPos, newPos) {
  const newGrid = grid.map((row) => [...row]);
  newGrid[oldPos.row][oldPos.col] = 0;
  newGrid[newPos.row][newPos.col] = 3;
  return newGrid;
}
