export function handlePacmanGhostCollision(grid, newPacmanPos, ghosts) {
    if (grid[newPacmanPos.row]?.[newPacmanPos.col] !== 2) {
      return {hitGhost: false, ateGhost: false};
    }
    
    const ghost = ghosts.find(g => g.row === newPacmanPos.row && g.col === newPacmanPos.col);
    if (ghost.frightened) return {hitGhost: false, ateGhost: true};

    return {hitGhost: true, ateGhost: false};
}