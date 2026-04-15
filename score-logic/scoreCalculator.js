export const COIN_POINTS = 10;
export const STARTING_LEVEL = 1;

export function createScoreState(initialLevel = STARTING_LEVEL) {
  return {
    score: 0,
    level: initialLevel,
    coinsEaten: 0,
  };
}

export function collectCoin(scoreState, points = COIN_POINTS) {
  scoreState.score += points;
  scoreState.coinsEaten++;
  return scoreState.score;
}

export function advanceLevel(scoreState) {
  scoreState.level++;
  scoreState.coinsEaten = 0;
  return scoreState.level;
}

export function resetScoreState(scoreState, startingLevel = STARTING_LEVEL) {
  scoreState.score = 0;
  scoreState.level = startingLevel;
  scoreState.coinsEaten = 0;
  return scoreState;
}
