const COIN_TILE = 4;
const DEFAULT_COIN_COUNT = 100;

// Randomly places coins on empty spaces (0) in the grid.
export function fillSpacesWithCoins(grid, coinsToPlace = DEFAULT_COIN_COUNT) {
  const emptySpaces = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 0) {
        emptySpaces.push({ row, col });
      }
    }
  }

  for (let i = emptySpaces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emptySpaces[i], emptySpaces[j]] = [emptySpaces[j], emptySpaces[i]];
  }

  for (let i = 0; i < Math.min(coinsToPlace, emptySpaces.length); i++) {
    const { row, col } = emptySpaces[i];
    grid[row][col] = COIN_TILE;
  }

  return grid;
}

export function eatCoinAtPosition(row, col, grid) {
  if (grid[row]?.[col] === COIN_TILE) {
    grid[row][col] = 0;
    return true;
  }

  return false;
}

export function countCoinsRemaining(grid) {
  let coinCount = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === COIN_TILE) {
        coinCount++;
      }
    }
  }

  return coinCount;
}

export function countCoinsIncludingGhosts(grid, ghosts = []) {
  const visibleCoins = countCoinsRemaining(grid);
  const hiddenCoins = ghosts.filter((ghost) => ghost.underlyingTile === COIN_TILE).length;
  return visibleCoins + hiddenCoins;
}

export function hasNoCoinsRemaining(grid) {
  return countCoinsRemaining(grid) === 0;
}
