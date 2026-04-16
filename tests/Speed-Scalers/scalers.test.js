import  {scalePacmanSpeed, 
        scaleGhostSpeed}  
from "../../game-map/Speed-Scalers/scalers.js";


describe("scalePacmanSpeed", ()=> {
    it("scales pacman's speed correctly based on the level", ()=> {
        //Arrange   
        const level = 10;
        const expectedSpeed = 10.5; // base 8 + (10 * .25) = 10.5
        //Act
        const result = scalePacmanSpeed(level);
        //Assert
        expect(result).toBe(expectedSpeed);
    });

    it("caps pacman's speed at 15", ()=> {
        //Arrange   
        const level = 30; // base 8 + (30 * .25) = 15.5, but should cap at 15
        const expectedSpeed = 15;
        //Act
        const result = scalePacmanSpeed(level);
        //Assert
        expect(result).toBe(expectedSpeed);
    });
});

describe("scaleGhostSpeed", ()=> {
    it("scales ghost's speed correctly based on the level", ()=> {
        //Arrange   
        const level = 10;
        const expectedSpeed = 11; // base 6 + (10 * .5) = 11
        //Act
        const result = scaleGhostSpeed(level);
        //Assert
        expect(result).toBe(expectedSpeed);
    }); 

    it("caps ghost's speed at 15", ()=> {
        //Arrange   
        const level = 20; // base 6 + (20 * .5) = 16, but should cap at 15
        const expectedSpeed = 15;
        //Act
        const result = scaleGhostSpeed(level);
        //Assert
        expect(result).toBe(expectedSpeed);
    });
});