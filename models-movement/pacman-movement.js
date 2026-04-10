//starting no movement
let currentDirection = { row: 0, col: 0 };
let nextDirection = { row: 0, col: 0 };

//keys to change direction
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      nextDirection = { row: -1, col: 0 };
      break;
    case "ArrowDown":
      nextDirection = { row: 1, col: 0 };
      break;
    case "ArrowLeft":
      nextDirection = { row: 0, col: -1 };
      break;
    case "ArrowRight":
      nextDirection = { row: 0, col: 1 };
      break;
  }
});

//move - check if a new directoon is there, if so do that. If not keep going in the same direction
function movePacman() {
  const nextRow = pacMan.row + nextDirection.row;
  const nextCol = pacMan.col + nextDirection.col;

  //if the next row or colum is not "1" - wall ... chnage direction (if a nextdirection has been chosen)- and also stops you from going off the board
  if (canTravelTo(grid, nextRow, nextCol)) {
    currentDirection = { ...nextDirection };
  }

  const moveRow = pacMan.row + currentDirection.row;
  const moveCol = pacMan.col + currentDirection.col;

  //if the move is not a wall, keep going - and replace the next grid with pacman ( i wonder if we can make this smoother)
  if (canTravelTo(grid, moveRow, moveCol)) {
    grid[pacMan.row][pacMan.col] = 0;
    pacMan.row = moveRow;
    pacMan.col = moveCol;
    grid[pacMan.row][pacMan.col] = 3;
  }
}
