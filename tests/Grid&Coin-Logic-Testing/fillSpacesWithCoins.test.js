import { fillSpacesWithCoins } from "../../game-map/Grid-System/coinGrid.js";

//fillSpacesWithCoins should loop through the grid and replace all 0s with 4s, which represent coins
// Parameters: grid:array[]
// Returns: void, but should modify the grid in place

describe("fillSpacesWithCoins", ()=> {
    it("fills spaces with coins", ()=> {
        //Arrange
        const grid =[
                    [1,1,1],
                    [1,0,0],
                    [1,0,1]
                    ];
        const expectedGrid =[
                    [1,1,1],
                    [1,4,4],
                    [1,4,1]
                    ];
        //Act
        fillSpacesWithCoins(grid);
        //Assert
        expect(grid).toEqual(expectedGrid);
    });

    it("does not modify spaces that are not empty", ()=> {
        //Arrange
        const grid =[
                    [1,1,1],
                    [1,1,0],
                    [1,0,1]
                    ];
        const expectedGrid =[
                    [1,1,1],
                    [1,1,4],
                    [1,4,1]
                    ];
        //Act
        fillSpacesWithCoins(grid);
        //Assert
        expect(grid).toEqual(expectedGrid);
    });
});