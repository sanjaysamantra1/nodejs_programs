const { isPrime } = require("../../index");

describe("Testing Index,js file", () => {
  it("should test the fibonacci()", () => {
    expect(isPrime(2)).toBe(true);
  });
});
