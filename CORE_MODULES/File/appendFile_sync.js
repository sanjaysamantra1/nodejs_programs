var fs = require("fs");

fs.appendFileSync("input.txt", "Hello content!", () => {});
fs.appendFileSync("input.txt", "Hello content!", () => {});
// Synchronous read
var data = fs.readFileSync("input.txt");
console.log("Synchronous read: " + data);
console.log("Synchronous read: " + data.toString());
