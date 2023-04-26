const fs = require("fs");
console.time("readFile");
const fileContent = fs.readFileSync("./file1.txt", "utf8");
console.log(fileContent);
console.timeEnd("readFile");
