/// Speed scalers for Pacman and ghosts
//Pacman will be base + ( level *.25) and ghost will be base + (level * .5)
// There will be a cap for speed so it doesnt just become impossible to play. cap speed 15

import { gV } from "../Global-Variables/global-variables.js";


 /**
   * Increase pacman's speed based on the current level, with a cap to prevent it from becoming too fast.
   * @param {number} level - The current level
   * @return {number} - The new speed for pacman
   */
export function scalePacmanSpeed(level){
    const baseSpeed = 8;
    const speedIncrease = level * 0.25;
    return Math.min(baseSpeed + speedIncrease, 15);       
}



 /**
   * Increase ghost's speed based on the current level, with a cap to prevent it from becoming too fast.
   * @param {number} level - The current level
   * @return {number} - The new speed for ghost
   */
export function scaleGhostSpeed(level){
    const baseSpeed = 6;
    const speedIncrease = level * 0.5;
    return Math.min(baseSpeed + speedIncrease, 15);       
}