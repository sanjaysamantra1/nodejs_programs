const { readFileSync, writeFileSync } = require("fs");

console.log("start");
const first = readFileSync("../File/content/first.txt", "utf8");
const second = readFileSync("../File/content/second.txt", "utf8");

writeFileSync("./output.txt", `Here is the result : ${first}, ${second}`, {
  flag: "a",
});
console.log("done with this task");
console.log("starting the next one"); //blocking user
