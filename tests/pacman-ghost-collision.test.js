//import 

//pacmanGhostCollision should return true if pacman collides with a ghost and false if not
// Parameters: pacman:{row:number, col:number}, ghost[]:{(row:number, col:number),
// (row:number, col:number),...}
// Returns: boolean, true if pacman collides with a ghost, false otherwise

describe("pacmanGhostCollision", ()=> {
    it("returns true when pacman collides with a ghost", ()=> {
        //Arrange
        const pacman = {row:1, col:1};
        const ghosts = [
            {row:1, col:1},
            {row:2, col:2},
            {row:3, col:3},
            {row:4, col:4}
        ];
        //Act
        const result = pacmanGhostCollision(pacman, ghosts);
        //Assert
        expect(result).toBe(true);
    });
    it("returns false when pacman does not collide with any ghost", ()=> {
        //Arrange
        const pacman = {row:1, col:1};
        const ghosts = [
            {row:2, col:2},
            {row:3, col:3},
            {row:4, col:4},
            {row:5, col:5}
        ];
        //Act
        const result = pacmanGhostCollision(pacman, ghosts);
        //Assert
        expect(result).toBe(false);
    });
});     