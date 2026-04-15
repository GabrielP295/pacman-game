import { setUpNextLevel } from "../game-map/set-up-next-level";

describe("setUpNextLevel", () => {
    it("increments the level, loads the new grid, scales speeds, and resets positions", () => {
        // Arrange  
        const gV = {
            level: 1,
            grid: [],   
            pacmanSpeed: 1,
            ghostSpeed: 1,
            pacMan: { row: 0, col: 0 }, 
            ghosts: [],
            ghostStartPositions: [],
            currentDirection: { row: 0, col: 0 },
            nextDirection: { row: 0, col: 0 },
        };

        // Act
        setUpNextLevel(gV);
        // Assert
        expect(gV.level).toBe(2);
        expect(gV.grid).not.toEqual([]);
        expect(gV.pacmanSpeed).toBeGreaterThan(1);
        expect(gV.ghostSpeed).toBeGreaterThan(1);
        expect(gV.pacMan).toEqual({ row: 1, col: 1 });
    });
});