import { canTravelTo } from "../movement.js";
import { directions } from "./ghost-utils.js";
import { calculateMinDistance } from "./ghost-utils.js";
import { isOppositeDirection } from "./ghost-utils.js";

// Red ghost targets Pacman's current position
export function calculateRedBestDirection(ghost, grid, pacman) {
  let minDistance = Infinity;
  let bestDirection;

  for (const direction of directions) {
    if (isOppositeDirection(direction, ghost.lastDirection)) continue;

    const possibleRow = ghost.row + direction.row;
    const possibleCol = ghost.col + direction.col;

    if (
      !canTravelTo(grid, possibleRow, possibleCol) ||
      grid[possibleRow][possibleCol] === 2
    )
      continue;

    const newDistance = calculateMinDistance(possibleRow, possibleCol, pacman);
    if (newDistance < minDistance) {
      minDistance = newDistance;
      bestDirection = direction;
    }
  }

  return bestDirection;
}
