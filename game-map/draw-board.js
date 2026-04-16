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

  const ghostColorMap = {
    [`${ghosts[0].row},${ghosts[0].col}`]: "red",
    [`${ghosts[1].row},${ghosts[1].col}`]: "pink",
    [`${ghosts[2].row},${ghosts[2].col}`]: "cyan",
    [`${ghosts[3].row},${ghosts[3].col}`]: "orange",
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      let content = gridContentMap[grid[row][col]];

      if (!content) continue;

      if (content === "ghosts") {
        const ghostColor = ghostColorMap[`${row},${col}`];
        cell.classList.add(ghostColor);
      }

      cell.classList.add(content);

      board.appendChild(cell);
    }
  }
}
