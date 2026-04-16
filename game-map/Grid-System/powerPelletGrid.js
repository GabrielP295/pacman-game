const powerPelletValue = 5;

export function eatPowerPelletAtPosition(row, col, grid) {
    if (!(grid[row]?.[col] === powerPelletValue)) return false;
    grid[row][col] = 0;
    return true;
}