import { resetPositions, resetGhostToCenter } from "../game-map/reset-positions";

describe("resetPositions", () => {
  it("resets pacman's position to the {1,1} coordinates", () => {
    // Arrange
    const gV = {
      grid: [
        [1, 1, 1],
        [1, 3, 1],
        [1, 1, 1],
        ],
    pacMan: { row: 2, col: 2 },
    ghosts: [],
    ghostStartPositions: [],
    currentDirection: { row: 1, col: 0 },
    nextDirection: { row: 1, col: 0 },
    };  

    const expectedPacManPosition = { row: 1, col: 1 };

    // Act
    resetPositions(gV); 
    // Assert
    expect(gV.pacMan).toEqual(expectedPacManPosition);
    });
});

describe("resetGhostToCenter", () => {
    it("resets ghosts to their starting positions", () => {
        // Arrange
        const gV = {
            grid: [
                [1, 1, 1],
                [1, 0, 1],
                [1, 1, 1],
            ],
            ghosts: [
                { row: 0, col: 0, underlyingTile: 1 },
                { row: 0, col: 2, underlyingTile: 1 },
            ],
            ghostStartPositions: [
                { row: 0, col: 0 },
                { row: 0, col: 2 },
            ],
        };

        // Act
        resetGhostToCenter(gV);

        // Assert
        expect(gV.ghosts[0]).toEqual(gV.ghostStartPositions[0]);
        expect(gV.ghosts[1]).toEqual(gV.ghostStartPositions[1]);
    });
});