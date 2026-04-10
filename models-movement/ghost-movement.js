const directions = [
  { row: -1, col: 0 }, //up
  { row: 1, col: 0 }, //down
  { row: 0, col: -1 }, //left
  { row: 0, col: 1 }, // right
];

function calculateMinDistance(row, col, pacman) {
  const rowDistance = Math.abs(row - pacman.row);
  const colDistance = Math.abs(col - pacman.col);
  return Math.sqrt(rowDistance ** 2 + colDistance ** 2);
}

function calculateBestDirection(ghost) {
  let minDistance = Infinity;
  let bestDirection;

  for (const direction of directions) {
    if (isOppositeDirection(direction, ghost.lastDirection)) continue;

    const possibleRow = ghost.row + direction.row;
    const possibleCol = ghost.col + direction.col;

    if (!canTravelTo(grid, possibleRow, possibleCol)) {
      continue;
    }

    if (grid[possibleRow][possibleCol] === 2) {
      continue;
    }

    const newDistance = calculateMinDistance(possibleRow, possibleCol, pacMan);
    if (newDistance < minDistance) {
      minDistance = newDistance;
      bestDirection = direction;
    }
  }

  return bestDirection;
}

function isOppositeDirection(direction, ghostDirection) {
  if(!direction || !ghostDirection) return false;
  const reversed = reverseDirection(direction);
  return reversed.row === ghostDirection.row && reversed.col === ghostDirection.col;
}

function reverseDirection(direction) {
  return {
    row: direction.row * -1,
    col: direction.col * -1,
  }
}

function moveGhost(ghost) {
  const direction = calculateBestDirection(ghost);

  if (!direction) return;

  const nextRow = ghost.row + direction.row;
  const nextCol = ghost.col + direction.col;

  if (grid[nextRow]?.[nextCol] === 3) {
    handleDeath();
    return;
  }

  grid[ghost.row][ghost.col] = 0;
  ghost.row = nextRow;
  ghost.col = nextCol;
  grid[ghost.row][ghost.col] = 2;
  ghost.lastDirection = direction;
}
