import { resolveDirection } from "./pacman-movement.js";
import { movePacman } from "./pacman-movement.js";
import { handlePacmanGhostCollision } from "./handle-pacman-ghost-colision.js";
import { eatCoinAtPosition } from "../game-map/Grid-System/coinGrid.js";

export function updatePacmanPosition(grid, pacMan, currentDirection, nextDirection) {
  if (!nextDirection) {
    return { hitGhost: false, ateCoin: false };
  }

  const newDirection = resolveDirection(
    grid,
    pacMan,
    currentDirection,
    nextDirection
  );

  currentDirection.row = newDirection.row;
  currentDirection.col = newDirection.col;

  const newPacmanPos = movePacman(
    pacMan,
    grid,
    currentDirection.row,
    currentDirection.col,
  );

  if (handlePacmanGhostCollision(grid, newPacmanPos)) {
    return { hitGhost: true, ateCoin: false };
  }

  const ateCoin = eatCoinAtPosition(newPacmanPos.row, newPacmanPos.col, grid);

  grid[pacMan.row][pacMan.col] = 0;
  pacMan.row = newPacmanPos.row;
  pacMan.col = newPacmanPos.col;
  grid[pacMan.row][pacMan.col] = 3;

  return { hitGhost: false, ateCoin };
}
