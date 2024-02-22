const { fibonacci, isPrime } = require("../..");

describe('This is test suite for index file', () => {
  it('This is testcase for is Prime', () => {
    expect(isPrime(6)).toBe(false);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(3)).toBe(true);
  })

  it('should verify fibonacci', () => {
    expect(fibonacci(3)).toEqual([0, 1, 1, 2])
  })
  it('should verify toCOntain', () => {
    let arr = [10, 20, 30];
    expect(arr).toContain(30)
    expect(arr).not.toContain(40)
  })
})