function calculateMinDistance(ghost, pacman) {
  const rowDistance = Math.abs(ghost.row - pacman.row);
  const colDistance = Math.abs(ghost.col - pacman.col);
  return Math.sqrt(rowDistance ** 2 + colDistance ** 2);
}
