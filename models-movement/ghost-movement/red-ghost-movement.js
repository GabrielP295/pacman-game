import { canTravelTo } from "../movement.js";

const directions = [
  { row: -1, col: 0 }, //up
  { row: 1, col: 0 }, //down
  { row: 0, col: -1 }, //left
  { row: 0, col: 1 }, // right
];

function calculateMinDistance(row, col, pacman) {
  const rowDistance = Math.abs(row - pacman.row);
  const colDistance = Math.abs(col - pacman.col);
  return Math.sqrt(rowDistance ** 2 + colDistance ** 2);
}

export function calculateBestDirection(ghost, grid, pacman) {
  let minDistance = Infinity;
  let bestDirection;

  for (const direction of directions) {
    if (isOppositeDirection(direction, ghost.lastDirection)) continue;

    const possibleRow = ghost.row + direction.row;
    const possibleCol = ghost.col + direction.col;

    if (!canTravelTo(grid, possibleRow, possibleCol)) {
      continue;
    }

    if (grid[possibleRow][possibleCol] === 2) {
      continue;
    }

    const newDistance = calculateMinDistance(possibleRow, possibleCol, pacman);
    if (newDistance < minDistance) {
      minDistance = newDistance;
      bestDirection = direction;
    }
  }

  return bestDirection;
}

function isOppositeDirection(direction, ghostDirection) {
  if (!direction || !ghostDirection) return false;
  const reversed = reverseDirection(direction);
  return (
    reversed.row === ghostDirection.row && reversed.col === ghostDirection.col
  );
}

function reverseDirection(direction) {
  return {
    row: direction.row * -1,
    col: direction.col * -1,
  };
}
