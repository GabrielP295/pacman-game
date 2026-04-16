import { eatCoinAtPosition } from "../../game-map/Grid-System/coinGrid.js";

//Our coinEatingDetection test should check if pacmans position is the same as a coin,
//if it is, we should replace 4 with a 0 in the grid
// Parameters: pacman:{row:number, col:number}, grid:array[]
// Returns: boolean, true if pacman eats a coin, false otherwise

describe("eatCoinAtPosition", ()=> {
    it("detects when pacman eats a coin and updates the grid", ()=> {
        //Arrange   
        const pacman = {row:1, col:1};
        const grid =[
                    [1,1,1],    
                    [1,4,0],
                    [1,0,1]
                    ];
        const expectedGrid =[
                    [1,1,1],    
                    [1,0,0],
                    [1,0,1]
                    ];
        //Act
        const result = eatCoinAtPosition(pacman.row, pacman.col, grid);
        
        //Assert
        expect(result).toBe(true);
        expect(grid).toEqual(expectedGrid);
    });
    it("returns false when pacman does not eat a coin", ()=> {
        //Arrange   
        const pacman = {row:1, col:1};
        const grid =[
                    [1,1,1],    
                    [1,0,0],
                    [1,0,1]
                    ];
        const expectedGrid =[
                    [1,1,1],    
                    [1,0,0],
                    [1,0,1]
                    ];
        //Act
        const result = eatCoinAtPosition(pacman.row, pacman.col, grid);
        //Assert
        expect(result).toBe(false);
        expect(grid).toEqual(expectedGrid);
    });
    
});