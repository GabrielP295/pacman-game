import {movePacmnan} from "../models-movement/pacman-movement";


// We can turn out movePacman function into a pure function
// Parameters: pacman, grid, rowToAdd, colToAdd  
// Returns: {row:number, col:number}
describe("movePacman", ()=> {
    it("moves down when there is no wall", ()=> {
        //Arrange
        const pacman = {row:1, col:1};
        const grid =[
                    [1,1,1],
                    [1,0,0],
                    [1,0,1]
                    ];
        //Act
        const result = movePacmnan(pacman,grid,1,0);
        
        //Assert
        expect(result).toEqual({row:2, col:1});
    });

    it("does not move into wall spaces",()=> {
        //Arrange
        const pacman = {row:1, col:1};
        const grid =[
                    [1,1,1],
                    [1,0,1],
                    [1,0,1]
                    ];
        //Act
        const result = movePacmnan(pacman,grid,0,1);

        //Assert
        expect(result).toEqual({row:1, col:1});
    });
});