const modal = document.getElementById("game-modal");
const message = document.getElementById("game-modal-message");
const btn = document.getElementById("game-modal-btn");
const leaderboardBtn = document.getElementById("game-modal-leaderboard-btn");

export function showModal(text, buttonText, { showLeaderboard = false } = {}) {
  message.textContent = text;
  btn.textContent = buttonText;

  if (showLeaderboard) {
    leaderboardBtn.classList.remove("hidden");
  } else {
    leaderboardBtn.classList.add("hidden");
  }

  modal.classList.remove("hidden");

  return new Promise((resolve) => {
    btn.onclick = () => {
      modal.classList.add("hidden");
      resolve();
    };
    leaderboardBtn.onclick = () => {
      // TODO: navigate to leaderboard page once it's built
      window.location.href = "leaderboard.html";
    };
  });
}
