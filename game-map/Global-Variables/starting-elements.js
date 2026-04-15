export const board = document.getElementById("game-board");
export const pacMan = { row: 1, col: 1 };
export const ghostStartPositions = [
  { row: 9, col: 8 },
  { row: 9, col: 9 },
  { row: 9, col: 10 },
  { row: 9, col: 11 },
];

export const ghosts = [];
for (const ghost of ghostStartPositions) {
  ghosts.push({ ...ghost, lastDirection: null, underlyingTile: 0 });
}




