import { countCoinsRemaining, countCoinsIncludingGhosts, hasNoCoinsRemaining } from "../../game-map/Grid-System/coinGrid";

describe("countCoinsRemaining", () => {
    it("counts the number of coins remaining in the grid", () => {
        // Arrange  
        const grid = [
            [1, 1, 1],
            [1, 4, 0],
            [1, 0, 1]
        ];
        const expectedCount = 1;

        // Act
        const actualCount = countCoinsRemaining(grid);

        // Assert
        expect(actualCount).toBe(expectedCount);
    });
});

describe("countCoinsIncludingGhosts", () => {
    it("counts the number of coins remaining in the grid including those hidden under ghosts", () => {
        // Arrange  
        const grid = [
            [1, 1, 1],
            [1, 4, 0],  
            [1, 0, 1]
        ];
        const ghosts = [    
            { underlyingTile: 4 }, // Ghost hiding a coin
            { underlyingTile: 0 }  // Ghost not hiding a coin
        ];
        const expectedCount = 2; // 1 visible coin + 1 hidden coin  
        
        // Act
        const actualCount = countCoinsIncludingGhosts(grid, ghosts);

        // Assert
        expect(actualCount).toBe(expectedCount);
    });
});

