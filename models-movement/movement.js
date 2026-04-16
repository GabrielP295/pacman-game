export function canTravelTo(grid, row, col) {
  const tile = grid[row]?.[col];
  if (tile === undefined) return false;
  return tile !== 1 && tile !== 9;
}

export function getTeleportDestination(grid, row, col, direction) {
  if (grid[row]?.[col] !== 8) return null;

  if (direction.col !== 0) {
    const pairedCol =
      direction.col > 0 ? grid[row].indexOf(8) : grid[row].lastIndexOf(8);
    if (pairedCol === col) return null;
    return { row, col: pairedCol + direction.col };
  }

  const colValues = grid.map((r) => r[col]);
  const pairedRow =
    direction.row > 0 ? colValues.indexOf(8) : colValues.lastIndexOf(8);
  if (pairedRow === row) return null;
  return { row: pairedRow + direction.row, col };
}
