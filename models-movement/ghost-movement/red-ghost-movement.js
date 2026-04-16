import { chooseBestDirection } from "./ghost-utils.js";

// Red ghost targets Pacman's current position
export function calculateRedBestDirection(ghost, grid, pacman) {
  return chooseBestDirection(ghost, grid, pacman);
}
