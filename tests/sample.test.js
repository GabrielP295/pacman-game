import { simpleAdd } from "./testSample";

describe("simpleAdd",()=>{
    it('adds', () => {
        //arrange
        let a = 1;
        let b =1;

        //act
        const result = simpleAdd(a,b);

        //assert
        expect(result).toEqual(2);
    });
});