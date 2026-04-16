const BASE_RELEASE_INTERVAL_MS = 3000;
const RELEASE_POSITION = { row: 7, col: 9 };

export function updateGhostRelease(gV, currentTime) {
  const nextGhost = gV.ghosts.find(ghost => !ghost.active);
  if (!nextGhost) return;

  const releaseInterval = BASE_RELEASE_INTERVAL_MS / gV.level;

  gV.lastGhostRelease ??= currentTime;
  if (currentTime - gV.lastGhostRelease < releaseInterval) return;

  gV.grid[nextGhost.row][nextGhost.col] = nextGhost.underlyingTile;
  nextGhost.row = RELEASE_POSITION.row;
  nextGhost.col = RELEASE_POSITION.col;
  nextGhost.underlyingTile = gV.grid[nextGhost.row][nextGhost.col];
  gV.grid[nextGhost.row][nextGhost.col] = 2;
  nextGhost.active = true;
  nextGhost.lastDirection = null;

  gV.lastGhostRelease = currentTime;
}
