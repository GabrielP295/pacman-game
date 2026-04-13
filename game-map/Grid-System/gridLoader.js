import { cloneGrid, fillSpacesWithCoins } from "./gridUtils.js";

// RoundCount an optional parameter that determines which grid to return based on the current round count
// each level will be repeated "roundCount" times before moving on to the next level


export function getGrid(level, gridArray, roundCount =1) {
    if(!gridArray || gridArray.length === 0){
        throw new Error("Grid array is empty or undefined");
    }
    
    // Ensure roundCount is at least 1 to avoid division by zero
    roundCount = Math.max(1, roundCount);

    //case statement for when the current grid index is negative
    if(level <= 0){
        return fillSpacesWithCoins(cloneGrid(gridArray[0]));
    }

    let adjustedLevel = Math.ceil(level/roundCount);
    let index = (adjustedLevel-1) % gridArray.length;
    // Return a deep copy of the grid to prevent mutations to the original grid
        return cloneGrid(gridArray[index]);
}