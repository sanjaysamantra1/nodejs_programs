describe("lets Understand Jasmine Global Functions", () => {
  beforeAll(() => {
    console.log("Before All...");
  });
  beforeEach(() => {
    console.log("Before Each...");
  });
  afterEach(() => {
    console.log("After Each...");
  });
  afterAll(() => {
    console.log("After All...");
  });

  it("This is It-1", () => {
    console.log("I am It-1");
  });
  it("This is It-2", () => {
    console.log("I am It-2");
  });
  it("This is It-3", () => {
    console.log("I am It-3");
  });
});
