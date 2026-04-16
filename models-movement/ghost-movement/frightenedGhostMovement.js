import { directions, isOppositeDirection } from "./ghost-utils.js";
import { canTravelTo } from "../movement.js";

export function calculateFrightenedDirection(ghost, grid) {
  const valid = directions.filter(dir => canTravelTo(grid, ghost.row + dir.row, ghost.col + dir.col));

  return valid[Math.floor(Math.random() * valid.length)] ?? null;
}