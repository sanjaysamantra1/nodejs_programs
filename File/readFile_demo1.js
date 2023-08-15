const fs = require("fs");

console.log("program started");
// Asynchonously read the file
fs.readFile("./content/first.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
  console.log(data.toString());
});
console.log("program finished");
