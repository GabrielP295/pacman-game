// Helper utility functions for score and level flow.

export function formatScore(score) {
  return score.toLocaleString();
}

export function calculateTimeBonus(secondsRemaining) {
  if (secondsRemaining <= 0) return 0;
  return Math.floor(secondsRemaining * 5);
}

export function shouldLevelUp(coinsRemaining) {
  return coinsRemaining === 0;
}

export function getSpeedForLevel(baseSpeed, level, startingLevel = 1) {
  return baseSpeed + (level - startingLevel);
}
