import { fillSpacesWithCoins } from "./coinGrid.js";
import { cloneGrid } from "./gridUtils.js";
// RoundCount an optional parameter that determines which grid to return based on the current round count
// each level will be repeated "roundCount" times before moving on to the next level

export function getGrid(level, gridArray, roundCount = 1) {
  if (!gridArray || gridArray.length === 0) {
    throw new Error("Grid array is empty or undefined");
  }

  roundCount = Math.max(1, roundCount);

  if (level <= 0) {
    return fillSpacesWithCoins(cloneGrid(gridArray[0]));
  }

  const adjustedLevel = Math.ceil(level / roundCount);
  const index = (adjustedLevel - 1) % gridArray.length;
  return fillSpacesWithCoins(cloneGrid(gridArray[index]));
}
