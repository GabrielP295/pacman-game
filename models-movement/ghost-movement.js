const directions = [
  { row: -1, col: 0 }, //up
  { row: 1, col: 0 }, //down
  { row: 0, col: -1 }, //left
  { row: 0, col: 1 }, // right
];

function calculateMinDistance(ghost, pacman) {
  const rowDistance = Math.abs(ghost.row - pacman.row);
  const colDistance = Math.abs(ghost.col - pacman.col);
  return Math.sqrt(rowDistance ** 2 + colDistance ** 2);
}

function calculateBestDirection(ghost) {
  let minDistance = Infinity;
  let bestDirection;

  for (const direction of directions) {
    const possibleRow = ghost.row + direction.row;
    const possibleCol = ghost.col + direction.col;

    if (!canTravelTo(grid, possibleRow, possibleCol)) {
      continue;
    }

    if (grid[possibleRow][possibleCol] === 2) {
      continue;
    }

    newDistance = calculateMinDistance(ghost, pacMan);
    minDistance = Math.min(minDistance, newDistance);
    bestDirection = direction;
  }

  return bestDirection;
}

function moveGhost(ghost) {
  const direction = calculateBestDirection(ghost);

  grid[ghost.row][ghost.col] = 0;
  ghost.row += direction.row;
  ghost.col += direction.col;
  grid[ghost.row][ghost.col] = 2;
}
