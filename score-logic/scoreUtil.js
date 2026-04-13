// Helper utility functions for score system

// Formats the score for display (e.g., 1000 -> "1,000")
function formatScore(score) {
    return score.toLocaleString();
}

// Calculates bonus points based on time (optional future feature)
// This can be used later when you want time-based bonuses
function calculateTimeBonus(secondsRemaining) {
    if (secondsRemaining <= 0) return 0;
    return Math.floor(secondsRemaining * 5); // 5 points per second
}

// Determines if the player should level up
// Called when coins are eaten to check win condition
function shouldLevelUp(coinsRemaining) {
    return coinsRemaining === 0;
}
