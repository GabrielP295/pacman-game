import { getLeaderboard, clearLeaderboard } from "./score-logic/leaderboard.js";

const tbody = document.getElementById("leaderboard-body");
const empty = document.getElementById("leaderboard-empty");
const clearBtn = document.getElementById("clear-btn");

const medals = ["🥇", "🥈", "🥉"];

function renderLeaderboard() {
  const board = getLeaderboard();
  tbody.innerHTML = "";

  if (board.length === 0) {
    empty.classList.remove("hidden");
    document.getElementById("leaderboard-table").style.display = "none";
    return;
  }

  empty.classList.add("hidden");
  document.getElementById("leaderboard-table").style.display = "table";

  board.forEach((entry, i) => {
    const rank = i < 3
      ? `<span class="rank-medal">${medals[i]}</span>`
      : `${i + 1}`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${rank}</td>
      <td>${entry.name}</td>
      <td>${entry.score.toLocaleString()}</td>
      <td>${entry.level}</td>
      <td>${entry.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

clearBtn.addEventListener("click", () => {
  if (confirm("Clear all high scores?")) {
    clearLeaderboard();
    renderLeaderboard();
  }
});

renderLeaderboard();