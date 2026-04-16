import { directions } from "./ghost-utils.js";
import { canTravelTo } from "../movement.js";
import { calculateMinDistance } from "./ghost-utils.js";
import { isOppositeDirection } from "./ghost-utils.js";

// Pink ghost targets a position 4 tiles ahead of Pacman's current direction
export function calculatePinkBestDirection(
  ghost,
  grid,
  pacman,
  currentPacmanDirection,
) {
  let minDistance = Infinity;
  let bestDirection;

  for (const direction of directions) {
    if (isOppositeDirection(direction, ghost.lastDirection)) continue;

    const pacmanRow = currentPacmanDirection.row * 4 + pacman.row;
    const pacmanCol = currentPacmanDirection.col * 4 + pacman.col;
    const targetPosition = { row: pacmanRow, col: pacmanCol };
    console.log(targetPosition);

    const possibleRow = ghost.row + direction.row;
    const possibleCol = ghost.col + direction.col;

    if (
      !canTravelTo(grid, possibleRow, possibleCol) ||
      grid[possibleRow][possibleCol] === 2
    ) {
      continue;
    }

    const newDistance = calculateMinDistance(
      possibleRow,
      possibleCol,
      targetPosition,
    );
    if (newDistance < minDistance) {
      minDistance = newDistance;
      bestDirection = direction;
    }
  }
  return bestDirection;
}
