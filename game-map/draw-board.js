import { board } from "./Global-Variables/starting-elements.js";

const gridContentMap = {
  0: "blank",
  1: "wall",
  2: "ghosts",
  3: "mans",
  4: "coin",
  6: "corral",
  8: "tunnel",
  9: "corral-gate",
};

export function drawBoard(grid, ghosts) {
  board.innerHTML = "";

  const ghostByPosition = {};
  for (const ghost of ghosts) {
    ghostByPosition[`${ghost.row},${ghost.col}`] = ghost;
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      let content = gridContentMap[grid[row][col]];
      const ghost = ghostByPosition[`${row},${col}`];
      if (ghost) {
        content = "ghosts";
      }

      if (!content) continue;

      if (ghost) {
        cell.classList.add(ghost.ghostColor);
      }

      cell.classList.add(content);

      board.appendChild(cell);
    }
  }
}
