//import statement

//hasNoCoinsRemaining should check if there are any coins left in the grid
// Parameters: grid:array[]
// Returns: boolean, true if there are no coins left, false otherwise

describe("hasNoCoinsRemaining", ()=> {
    it("returns true when there are no coins left in the grid", ()=> {
        //Arrange 
        const grid =[
                    [1,1,1],
                    [1,0,0],
                    [1,0,1]
                    ];  
        //Act
        const result = hasNoCoinsRemaining(grid); 
        //Assert
        expect(result).toBe(true);
    });
    it("returns false when there are coins left in the grid", ()=> {
        //Arrange  
        const grid =[
                    [1,1,1],
                    [1,4,0],
                    [1,0,1]
                    ];
        //Act
        const result = hasNoCoinsRemaining(grid);
        //Assert
        expect(result).toBe(false);
    });
});