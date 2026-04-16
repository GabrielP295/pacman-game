import { calculateRedBestDirection } from "../../models-movement/ghost-movement/red-ghost-movement.js";

export const board = document.getElementById("game-board");
export const pacMan = { row: 1, col: 1 };
export const ghostStartPositions = [
  { row: 9, col: 8 },
  { row: 9, col: 9 },
  { row: 9, col: 10 },
  { row: 9, col: 11 },
];

const ghostNumbers = {
  0: "red",
  1: "pink",
  2: "cyan",
  3: "orange",
};
let ghostNumber = 0;

export const ghosts = [];
for (const ghost of ghostStartPositions) {
  ghosts.push({
    ...ghost,
    ghostColor: ghostNumbers[ghostNumber++],
    directionSolver: calculateRedBestDirection,
    lastDirection: { row: 1, col: 0 },
    underlyingTile: 0,
    active: false,
  });
}
