//This file contains utility functions for working with the grid system in the Pacman game.

//fillSpacesWithCoins takes a grid as input and replaces all empty spaces (0) with coins (4) and returns the modified grid
export function fillSpacesWithCoins(grid) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 0) {
                grid[row][col] = 4; // Replace empty space with a coin
            }
        }
    }
    return grid;
}


export function cloneGrid(grid) {
  return grid.map(row => [...row]);
}