import { startGame } from "../pacman.js";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("start-overlay");
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
    startGame();
  });
});