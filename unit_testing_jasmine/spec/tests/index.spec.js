const { isPrime, fibonacci, isEven, isOdd, toLowerCase, repeat } = require("../..");

describe("This is index.js test suite", () => { // test suite

    it('this should test isPrime function', () => { // test case
        // expect(actual).matcher(expected);
        expect(isPrime(5)).toBe(true); // expectation
        expect(isPrime(6)).toBe(false); // expectation
    });

    it('this should test fibonacci function', () => {
        expect(fibonacci(1)).toEqual([0, 1]);
        expect(fibonacci(2)).toEqual([0, 1, 1]);
    });

    it('this should test isEven function', () => {
        expect(isEven(2)).toBe(true);
        expect(isEven(3)).toBe(false);
    });
    it('this should test isOdd function', () => {
        expect(isOdd(2)).toBe(false);
        expect(isOdd(3)).toBe(true);
    });
    it('this should test toLowerCase & toUpperCasefunction', () => {
        expect('SAchin'.toLocaleLowerCase()).toBe('sachin')
        expect('SAchin'.toUpperCase()).toBe('SACHIN')
    });
    it('this should test  repeat function', () => {
       expect(repeat('A',3)).toBe('AAA')
    });


});