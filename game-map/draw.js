import { drawBoard } from "./draw-board.js";

export function draw(gV) {
  drawBoard(gV.grid);

  const pacmanElement = document.querySelector(".mans");

  if (!pacmanElement) return;

  rotatePacman(pacmanElement, gV.currentDirection);
}

function rotatePacman(element, direction) {
  const map = {
    "0,1": "rotate(0deg)",
    "0,-1": "rotate(180deg)",
    "1,0": "rotate(90deg)",
    "-1,0": "rotate(270deg)",
  };

  const key = `${direction.row},${direction.col}`;
  element.style.transform = map[key] || "rotate(0deg)";
}
