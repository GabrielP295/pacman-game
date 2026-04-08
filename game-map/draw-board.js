function drawBoard() {
  board.innerHTML = "";

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (grid[row][col] === 1) {
        cell.classList.add("wall");
      } else if (grid[row][col] === 3) {
        cell.classList.add("mans");
      } else {
        cell.classList.add("blank");
      }

      board.appendChild(cell);
    }
  }
}

drawBoard();
