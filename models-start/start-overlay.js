import { startGame } from "../pacman.js";

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("intro-splash");
  const overlay = document.getElementById("start-overlay");
  const startButton = document.getElementById("start-button");

  setTimeout(() => splash.classList.add("fade-out"), 2000);
  splash.addEventListener("transitionend", () => splash.remove());

  startButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
    startGame();
  });
});