//This file contains utility functions for working with the grid system in the Pacman game.

// Randomly places 100 coins on empty spaces (0) in the grid
function fillSpacesWithCoins(grid) {
    // Step 1: Find all empty spaces (positions with value 0)
    const emptySpaces = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 0) {
                emptySpaces.push({ row, col });
            }
        }
    }

    // Step 2: Shuffle the array to randomize
    for (let i = emptySpaces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [emptySpaces[i], emptySpaces[j]] = [emptySpaces[j], emptySpaces[i]];
    }

    // Step 3: Place 100 coins on the first 100 shuffled positions
    const coinsToPlace = 100;
    for (let i = 0; i < Math.min(coinsToPlace, emptySpaces.length); i++) {
        const { row, col } = emptySpaces[i];
        grid[row][col] = 4; // 4 = coin
    }

    return grid;
}

function cloneGrid(grid) {
  return grid.map(row => [...row]);
}

// Checks if there's a coin at the given position and eats it (changes 4 to 0)
// Returns true if a coin was eaten, false otherwise
function eatCoinAtPosition(row, col, grid) {
    if (grid[row]?.[col] === 4) {
        grid[row][col] = 0; // Remove the coin
        return true;
    }
    return false;
}

// Counts how many coins (value 4) are remaining on the grid
function countCoinsRemaining(grid) {
    let coinCount = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 4) {
                coinCount++;
            }
        }
    }
    return coinCount;
}

// Checks if there are no coins remaining on the grid (WIN CONDITION)
// Returns true if no coins left, false if coins still remain
function hasNoCoinsRemaining(grid) {
    return countCoinsRemaining(grid) === 0;
}