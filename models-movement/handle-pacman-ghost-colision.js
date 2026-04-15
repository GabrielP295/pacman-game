export function handlePacmanGhostCollision(grid, newPacmanPos) {
    if (grid[newPacmanPos.row]?.[newPacmanPos.col] === 2) {
      // handle death 
      return true;
    }
    return false;
}