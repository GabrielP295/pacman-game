import { drawBoard } from "./draw-board.js";

export function draw(gV) {
  drawBoard(gV.grid);

  const pacmanElement = document.querySelector(".mans");

  if (pacmanElement) {
    if (gV.currentDirection.col === 1) {
      pacmanElement.style.transform = "rotate(0deg)"; // Facing Right (Default)
    } else if (gV.currentDirection.col === -1) {
      pacmanElement.style.transform = "rotate(180deg)"; // Facing Left
    } else if (gV.currentDirection.row === 1) {
      pacmanElement.style.transform = "rotate(90deg)"; // Facing Down
    } else if (gV.currentDirection.row === -1) {
      pacmanElement.style.transform = "rotate(270deg)"; // Facing Up
    }
  }
}