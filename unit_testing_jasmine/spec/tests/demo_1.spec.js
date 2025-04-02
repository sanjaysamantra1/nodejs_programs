const { isPrime, fibonacci, isEven, isOdd, toLowerCase, repeat } = require("../..");

describe("This is test suite", () => { // test suite

    it('this is testcase-1', () => { // testcase
        console.log('this is testcase-1')
    });
    it('this is testcase-2', () => { // testcase
        console.log('this is testcase-2')
    });
    it('this is testcase-3', () => { // testcase
        console.log('this is testcase-3')
    });

    beforeAll(() => { // 1
        console.log('Before All...');  // Before All it()
    })
    beforeEach(() => {  // n(# of it = 3) times
        console.log('Before Each...'); //  Before Each it()
    })
    afterEach(() => {  // n(# of it = 3) times
        console.log('After Each...'); //  After Each it()
    })
    afterAll(() => {  // 1
        console.log('After All...');  // Before All it()
    })

});