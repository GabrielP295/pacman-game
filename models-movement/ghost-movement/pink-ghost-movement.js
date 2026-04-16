import { chooseBestDirection } from "./ghost-utils.js";

// Pink ghost targets a position 4 tiles ahead of Pacman's current direction
export function calculatePinkBestDirection(
  ghost,
  grid,
  pacman,
  currentPacmanDirection,
) {
  const targetPosition = {
    row: pacman.row + currentPacmanDirection.row * 4,
    col: pacman.col + currentPacmanDirection.col * 4,
  };
  return chooseBestDirection(ghost, grid, targetPosition);
}
