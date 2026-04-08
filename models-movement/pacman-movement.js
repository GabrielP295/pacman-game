export function movePacmnan(rowToAdd = 0, colToAdd = 0) {
  if (grid[pacMan.row + rowToAdd][pacMan.col + colToAdd] === 1) {
    return;
  }

  pacMan.row += rowToAdd;
  pacMan.col += colToAdd;
}

document.addEventListener("keydown", (e) => {
  grid[pacMan.row][pacMan.col] = 0;
  if (e.key === "ArrowDown") {
    movePacmnan(1, 0);
  }
  if (e.key === "ArrowUp") {
    movePacmnan(-1, 0);
  }
  if (e.key === "ArrowLeft") {
    movePacmnan(0, -1);
  }
  if (e.key === "ArrowRight") {
    movePacmnan(0, 1);
  }

  grid[pacMan.row][pacMan.col] = 3;

  drawBoard();
});
