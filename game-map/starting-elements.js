const board = document.getElementById("game-board");
const pacMan = { row: 1, col: 1 };
const ghostStartPositions = [
  { row: 9, col: 8 },
  { row: 9, col: 9 },
  { row: 9, col: 10 },
  { row: 9, col: 11 },
];

const ghosts = [];
for (const ghost of ghostStartPositions) {
  ghosts.push({ ...ghost });
}


