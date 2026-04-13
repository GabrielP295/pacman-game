// Score tracking helpers for Pac-Man.
// Wrapped to avoid leaking names like `score` and `level` into the browser global scope.

(function attachScoreCalculator(globalScope) {
  let score = 0;
  let level = 1;
  let coinsEaten = 0;

  const points = {
    coinEaten: 10,
  };

  function addCoinPoints() {
    score += points.coinEaten;
    coinsEaten++;
    return score;
  }

  function getScore() {
    return score;
  }

  function getLevel() {
    return level;
  }

  function getCoinsEaten() {
    return coinsEaten;
  }

  function advanceLevel() {
    level++;
    coinsEaten = 0;
    return level;
  }

  function resetScore() {
    score = 0;
    level = 1;
    coinsEaten = 0;
  }

  function getGameSpeedForLevel() {
    return 6 + (level - 1);
  }

  const scoreCalculator = {
    addCoinPoints,
    getScore,
    getLevel,
    getCoinsEaten,
    advanceLevel,
    resetScore,
    getGameSpeedForLevel,
  };

  if (globalScope) {
    globalScope.scoreCalculator = scoreCalculator;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = scoreCalculator;
  }
})(typeof window !== "undefined" ? window : globalThis);
