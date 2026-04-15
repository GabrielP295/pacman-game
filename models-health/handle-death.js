import { showModal } from "../game-modal.js";

export async function handleDeath(pacmanHealth, healthUI) {
  pacmanHealth.takeDamage(1);
  healthUI.animateDamage();
  healthUI.update();
  await showModal("You died!", "Continue");

  return !pacmanHealth.isAlive();
}