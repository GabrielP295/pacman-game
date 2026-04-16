export const directions = [
  { row: -1, col: 0 }, //up
  { row: 1, col: 0 }, //down
  { row: 0, col: -1 }, //left
  { row: 0, col: 1 }, // right
];

export function calculateMinDistance(row, col, target) {
  const rowDistance = Math.abs(row - target.row);
  const colDistance = Math.abs(col - target.col);
  return Math.sqrt(rowDistance ** 2 + colDistance ** 2);
}

export function isOppositeDirection(direction, ghostDirection) {
  if (!direction || !ghostDirection) return false;
  const reversed = reverseDirection(direction);
  return (
    reversed.row === ghostDirection.row && reversed.col === ghostDirection.col
  );
}

function reverseDirection(direction) {
  return {
    row: direction.row * -1,
    col: direction.col * -1,
  };
}
