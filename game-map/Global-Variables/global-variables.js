import { HealthCounter } from "../../models-health/health-counter.js";
import { HealthCounterUI } from "../../models-health/health-counter-ui.js";
import { pacMan, ghosts, ghostStartPositions } from "./starting-elements.js";
import { getGrid } from "../Grid-System/gridLoader.js";
import { grids } from "../Grid-System/grids.js";


//gV stands for global Variables
export const gV = {
  level: 1,
  grid: getGrid(1, grids),
  lives: 3,
  isGameOver: false,

  pacmanSpeed: 8,
  ghostSpeed: 6,
  lastPacmanMove: 0,
  lastGhostMove: 0,

  currentDirection: { row: 0, col: 0 },
  nextDirection: { row: 0, col: 0 },

  pacmanHealth: new HealthCounter(3, 5),

  pacMan: pacMan,
  ghosts: ghosts,
  ghostStartPositions: ghostStartPositions,
}

gV.healthUI = new HealthCounterUI(gV.pacmanHealth, "health-display", {
    style: "hearts",
    animateDamage: true,
  });