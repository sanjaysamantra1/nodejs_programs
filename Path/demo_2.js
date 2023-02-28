const path = require("path");

console.log(path.sep);
console.log(path.delimiter);

const pathToFile = path.format({
  dir: "public_html/home/js",
  base: "app.js",
});
console.log(pathToFile);

let pathObj = path.parse('d:/nodejs/html/js/app.js');
console.log(pathObj);

const filePath = path.join("/content/", "subfolder", "test.txt");
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt");
console.log(absolute);
