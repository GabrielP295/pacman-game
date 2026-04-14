import { resolveDirection } from "./pacman-movement.js";
import { handleDeath } from "../models-health/handle-death.js";
import { movePacman } from "./pacman-movement.js";
import { handlePacmanGhostCollision } from "./handle-pacman-ghost-colision.js";

export function updatePacmanPosition(grid, pacMan, currentDirection, nextDirection) {
    if (!nextDirection) {
    return { ...currentDirection };
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

    if(handlePacmanGhostCollision(grid, newPacmanPos)) {
      return true;
    }

    grid[pacMan.row][pacMan.col] = 0;
    pacMan.row = newPacmanPos.row;
    pacMan.col = newPacmanPos.col;
    grid[pacMan.row][pacMan.col] = 3;
    return false;
}