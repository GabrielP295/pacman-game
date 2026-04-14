import { board } from "./Global-Variables/starting-elements.js";

const gridContentMap = {
  0: "blank",
  1: "wall",
  2: "ghosts",
  3: "mans",
  4: "coin",
  8: "tunnel",
};

export function drawBoard(grid) {
  board.innerHTML = "";

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      let content = gridContentMap[grid[row][col]];

      if (!content) continue;

      cell.classList.add(content);

      board.appendChild(cell);
    }
  }
}
