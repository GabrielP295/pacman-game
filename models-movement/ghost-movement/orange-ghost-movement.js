import { chooseBestDirection, isWithinRange } from "./ghost-utils.js";
import { calculateRedBestDirection } from "./red-ghost-movement.js";

// Orange ghost targets a random corner when close to pacman, otherwise chases Pacman
export function calculateOrangeBestDirection(ghost, grid, pacman) {
  const gridCorners = getGridCorners(grid);

  // If the ghost is more than 8 tiles away from pacmam, it chases pacman
  if (!isWithinRange(ghost, pacman, 8)) {
    return calculateRedBestDirection(ghost, grid, pacman);
  }

  const randomCorner =
    gridCorners[Math.floor(Math.random() * gridCorners.length)];

  return chooseBestDirection(ghost, grid, randomCorner);
}

function getGridCorners(grid) {
  return [
    { row: 1, col: 1 },
    { row: 1, col: grid[0].length - 2 },
    { row: grid.length - 2, col: 1 },
    { row: grid.length - 2, col: grid[0].length - 2 },
  ];
}
