import { directions, isOppositeDirection } from "./ghost-utils.js";
import { canTravelTo } from "../movement.js";

function frightenedDirectionFilter(dir) {
    return can
}

export function calculateFrightenedDirection(ghost, grid) {
  const valid = directions.filter(dir => canTravelTo(grid, ghost.row + dir.row, ghost.col + dir.col));

  return valid[Math.floor(Math.random() * choices.length)] ?? null;
}