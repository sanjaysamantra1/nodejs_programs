const { isPrime } = require("../../index");

describe("Testing Index.js file", () => {
  it("should test the isPrime()", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(4)).toBe(true);
  });
});
