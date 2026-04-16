import { chooseBestDirection, isWithinRange } from "./ghost-utils.js";

let currentTarget = { row: 0, col: 0 };

// Cyan ghost targets a random position on the grid
export function calculateCyanBestDirection(ghost, grid) {
  if (!isWithinRange(ghost, currentTarget, 1))
    return chooseBestDirection(ghost, grid, currentTarget);

  currentTarget = {
    row: Math.round(Math.random() * grid.length - 1),
    col: Math.round(Math.random() * grid[0].length - 1),
  };

  return chooseBestDirection(ghost, grid, currentTarget);
}
