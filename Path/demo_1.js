const path = require("path");

const dirName = path.dirname("E:/Training/UI/UI_progs/NodeJS/PATH/demo_1.js");
console.log(dirName);
const filename = path.basename("E:/Training/UI/UI_progs/NodeJS/PATH/demo_1.js");
console.log(filename);
const extensionName = path.extname(
  "E:/Training/UI/UI_progs/NodeJS/PATH/demo_1.js"
);
console.log(extensionName);
const myPath = path.parse("E:/Training/UI/UI_progs/NodeJS/PATH/demo_1.js");
console.log(myPath);
