function movePacman(pacman, grid, rowToAdd, colToAdd) {
  return getNextPosition(grid, pacman, { row: rowToAdd, col: colToAdd });
}

function keyToDirection(key) {
  const directionMap = {
    ArrowUp: { row: -1, col: 0 },
    ArrowDown: { row: 1, col: 0 },
    ArrowLeft: { row: 0, col: -1 },
    ArrowRight: { row: 0, col: 1 },
  };
  return directionMap[key] || null;
}

function isWall(grid, row, col) {
  return grid[row]?.[col] === 1;
}

function resolveDirection(grid, pacMan, currentDirection, nextDirection) {
  const nextRow = pacMan.row + nextDirection.row;
  const nextCol = pacMan.col + nextDirection.col;

  if (!isWall(grid, nextRow, nextCol)) {
    return { ...nextDirection };
  }
  return { ...currentDirection };
}

function getNextPosition(grid, pacMan, direction) {
  const moveRow = pacMan.row + direction.row;
  const moveCol = pacMan.col + direction.col;

  if (!isWall(grid, moveRow, moveCol)) {
    return { row: moveRow, col: moveCol };
  }
  return { row: pacMan.row, col: pacMan.col };
}

function applyMove(grid, oldPos, newPos) {
  const newGrid = grid.map((row) => [...row]);
  newGrid[oldPos.row][oldPos.col] = 0;
  newGrid[newPos.row][newPos.col] = 3;
  return newGrid;
}
