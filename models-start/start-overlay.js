import { startGame } from "../pacman.js";

const splash = document.getElementById("intro-splash");

// Wait 2 seconds, then fade out
setTimeout(() => {
  splash.classList.add("fade-out");
}, 2000);

// Optional: once fully faded, remove from DOM so it can't interfere
splash.addEventListener("transitionend", () => {
  splash.remove();
});

//Start button overlay
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("start-overlay");
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
    startGame();
  });
});