import { getGrid } from "../Grid-System/gridLoader.js";
import { grids } from "../Grid-System/grids.js";
import { scalePacmanSpeed, scaleGhostSpeed } from "./Speed-Scalers/scalers.js";
import { gV } from "../Global-Variables/global-variables.js";
import { resetPositions } from "./reset-positions.js";


 /**
   * Set up the next level by incrementing the level, loading the new grid, scaling speeds, and resetting positions.
   * @param {GlobalVariableObject} gV - The global variables object containing game state
   */
export function setUpNextLevel(gV){
    gV.level += 1;
    gV.grid = getGrid(gV.level, grids);
    gV.pacmanSpeed = scalePacmanSpeed(gV.level);
    gV.ghostSpeed = scaleGhostSpeed(gV.level);
    resetPositions(gV); 
}