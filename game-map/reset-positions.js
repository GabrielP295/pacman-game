// Resets entities to their starting spots without resetting the score/coins

export function resetPositions(gV){
  // 1. Clear Pac-Man's current spot on the grid
    gV.grid[gV.pacMan.row][gV.pacMan.col] = 0;
  
    // Delete ghosts from current position on the grid
    gV.ghosts.forEach((ghost) => {
      gV.grid[ghost.row][ghost.col] = 0;
    });
  
    // 2. Put Pac-Man back at the start
    gV.pacMan.row = 1;
    gV.pacMan.col = 1;
    gV.grid[gV.pacMan.row][gV.pacMan.col] = 3;
  
    // 3. Reset the direction so he doesn't immediately run into a wall
    gV.currentDirection = { row: 0, col: 0 };
    gV.nextDirection = { row: 0, col: 0 };
  
    // 4. Reset the ghosts to the center box
    resetGhostToCenter(gV);
}

export function resetGhostToCenter(gV) {
  for (let i = 0; i < gV.ghosts.length; i++) {
    gV.ghosts[i].row = gV.ghostStartPositions[i].row;
    gV.ghosts[i].col = gV.ghostStartPositions[i].col;
    gV.grid[gV.ghosts[i].row][gV.ghosts[i].col] = 2;
  }
}