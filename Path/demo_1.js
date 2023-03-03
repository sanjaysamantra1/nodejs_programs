const path = require("path");

console.log(`Separator: ${path.sep}`);
console.log(`Delimeter: ${path.delimiter}`);

const dirName = path.dirname("E:/Training/UI/UI_progs/NodeJS/PATH/demo_1.js");
console.log(`Directory Name:: ${dirName}`);

const fileNameWithExt = path.basename(
  "E:/Training/UI/UI_progs/NodeJS/PATH/demo_1.js"
);
console.log(`File Name With Ext:: ${fileNameWithExt}`);

let fileNameWithoutExt = path.basename(
  "E:/Training/UI/UI_progs/NodeJS/PATH/demo_1.js",
  ".js"
);
console.log(`File Name With out Ext:: ${fileNameWithoutExt}`);

const extensionName = path.extname(
  "E:/Training/UI/UI_progs/NodeJS/PATH/demo_1.js"
);
console.log(`Extension Name:: ${extensionName}`);
