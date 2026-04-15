import { formatScore } from "./scoreUtil.js";

export function updateStatsDisplay(scoreState) {
  const scoreDisplay = document.getElementById("score-display");
  const levelDisplay = document.getElementById("level-display");

  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${formatScore(scoreState.score)}`;
  }

  if (levelDisplay) {
    levelDisplay.textContent = `Level: ${scoreState.level}`;
  }
}
