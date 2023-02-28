console.log("This is a log");
console.info("This is an Information");
console.warn("This is a warning message");
console.error(new Error("this is an error"));
console.assert(5 == 4, "5 is not equal with 4");
// the message gets printed to the console only when the assertion fails
console.assert(5 == 5, "5 is equal with 5");

let arr = [10, 20, 30, 40, 50];
console.table(arr);
