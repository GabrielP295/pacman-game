
//Score-calulator function should return the correct score
// Parameters: currentScore:number , pointsToAdd:number
// Returns: number

descibe("scoreCalculator", ()=> {
    it("adds points to the current score", ()=> {
        //Arrange
        const currentScore = 10;
        const pointsToAdd = 10;
        const expectedScore = 20;
        //Act
        const result = scoreCalculator(currentScore, pointsToAdd);
        //Assert
        expect(result).toEqual(expectedScore);
    });

    it("does not change the score if pointsToAdd is negative", ()=> {
        //Arrange
        const currentScore = 10;
        const pointsToAdd = -5;
        const expectedScore = 10;
        //Act
        const result = scoreCalculator(currentScore, pointsToAdd);
        //Assert
        expect(result).toEqual(expectedScore);
    });
    it("does not change the score if pointsToAdd is zero", ()=> {
        //Arrange
        const currentScore = 10;
        const pointsToAdd = 0;
        const expectedScore = 10;
        //Act
        const result = scoreCalculator(currentScore, pointsToAdd);
        //Assert
        expect(result).toEqual(expectedScore);
    });
    it("takes numbers as strings and converts them to numbers", ()=> {
        //Arrange
        const currentScore = "10";
        const pointsToAdd = "5";
        const expectedScore = 15;
        //Act
        const result = scoreCalculator(currentScore, pointsToAdd);
        //Assert
        expect(result).toEqual(expectedScore);
    });
    it("returns currentScore if pointsToAdd is not a number", ()=> {
        //Arrange
        const currentScore = 10;
        const pointsToAdd = "not a number";
        const expectedScore = 10;
        //Act
        const result = scoreCalculator(currentScore, pointsToAdd);
        //Assert
        expect(result).toEqual(expectedScore);
    });
    
});