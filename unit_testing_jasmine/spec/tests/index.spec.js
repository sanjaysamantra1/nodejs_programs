const { isPrime, fibonacci } = require("../../index");

describe("Testing Index.js file", () => {
  it("should test the isPrime()", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(4)).not.toBe(true);
  });
  it("comparing toBe and toEquals()", () => {
    let a = 10;
    let b = 10;
    let obj1 = { a, b };
    let obj2 = { a, b };
    expect(a).toBe(b);
    expect(obj1).toEqual(obj2);
  });
  it("testing toContain", () => {
    let cars = ["tata", "honda"];
    expect(cars).toContain("tata");
    expect(cars).not.toContain("Audi");
  });
  it("testing fibonacci functions", () => {
    expect(fibonacci(1)).toEqual([0, 1]);
    expect(fibonacci(2)).toEqual([0, 1, 1]);
    expect(fibonacci(3)).toEqual([0, 1, 1, 2]);
    expect(fibonacci(4)).toEqual([0, 1, 1, 2, 3]);
  });
});


