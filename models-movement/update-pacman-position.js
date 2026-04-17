import { resolveDirection } from "./pacman-movement.js";
import { movePacman } from "./pacman-movement.js";
import { handlePacmanGhostCollision } from "./handle-pacman-ghost-colision.js";
import { eatCoinAtPosition } from "../game-map/Grid-System/coinGrid.js";
import { eatPowerPelletAtPosition } from "../game-map/Grid-System/powerPelletGrid.js"

export function updatePacmanPosition(grid, pacMan, currentDirection, nextDirection, ghosts) {
  if (!nextDirection) {
    return { hitGhost: false, ateCoin: false, atePowerPellet: false, ateGhost: false };
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

  const collision = handlePacmanGhostCollision(grid, newPacmanPos, ghosts);

  if (collision.hitGhost) {
    return { hitGhost: true, ateCoin: false, atePowerPellet: false, ateGhost: false };
  }

  const atePowerPellet = eatPowerPelletAtPosition(newPacmanPos.row, newPacmanPos.col, grid);
  const ateCoin = !atePowerPellet && eatCoinAtPosition(newPacmanPos.row, newPacmanPos.col, grid);

  grid[pacMan.row][pacMan.col] = 0;
  pacMan.row = newPacmanPos.row;
  pacMan.col = newPacmanPos.col;
  grid[pacMan.row][pacMan.col] = 3;

  return { hitGhost: false, ateCoin, atePowerPellet, ateGhost: collision.ateGhost };
}
