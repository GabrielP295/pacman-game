


export function handleDeath(pacmanHealth, healthUI) {
  pacmanHealth.takeDamage(1);
  healthUI.animateDamage();
  healthUI.update();
  alert("You died!"); //temp popup to know when dead

  return !pacmanHealth.isAlive();
}