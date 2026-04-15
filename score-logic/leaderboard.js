/**
 * leaderboard.js
 *
 * Pure functions for saving and loading high scores.
 * Uses localStorage so scores persist across sessions in the browser.
 * No dependencies on any other game module — safe to import anywhere.
 */

const LEADERBOARD_KEY = 'pacman_leaderboard';
const MAX_ENTRIES = 10;

/**
 * Returns the full leaderboard array, sorted best-first.
 * Each entry: { name: string, score: number, level: number, date: string }
 *
 * @returns {Array<{name: string, score: number, level: number, date: string}>}
 */

export function getLeaderboard() {
    try {
        const raw = localStorage.getItem(LEADERBOARD_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/**
 * Saves a new score entry to the leaderboard.
 * Keeps only the top MAX_ENTRIES scores, sorted by score descending.
 *
 * @param {string} name    - Player's name/initials
 * @param {number} score   - Final score
 * @param {number} level   - Level reached
 * @returns {Array}        - Updated leaderboard
 */

export function saveScore(name, score, level) {
    const board = getLeaderboard();

    const entry = {
        name: name.trim().slice(0, 12) || "AAA",
        score,
        level,
        date: new Date().toISOString(),
    };

    board.push(entry);
    board.sort((a, b) => b.score - a.score);
    const trimmed = board.slice(0, MAX_ENTRIES);

    try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
    } catch { 
        // Ignore storage errors (e.g. quota exceeded)
        console.warn("Could not save leaderboard entry.");
    }

    return trimmed;
}

/**
 * Returns true if the given score qualifies for the leaderboard
 * (i.e. the board has room, or this score beats the lowest entry).
 *
 * @param {number} score
 * @returns {boolean}
 */

export function isHighScore(score) {
    if (score <= 0) return false; // Ignore non-positive scores

    const board = getLeaderboard();
    if (board.length < MAX_ENTRIES) return true; // Room for more scores

    return score > board[board.length - 1].score; // Better than lowest score
}

/**
 * Wipes the leaderboard. Useful for testing or a "reset" UI.
 */

export function clearLeaderboard() {
    try {
        localStorage.removeItem(LEADERBOARD_KEY);
    } catch {
        console.warn("Could not clear leaderboard.");
    }
}



