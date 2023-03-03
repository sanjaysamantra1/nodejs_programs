const path = require("path");

const isAbsoluteRes1 = path.isAbsolute("C:/program files");
console.log(`is Absolute: ${isAbsoluteRes1}`); // true

const isAbsoluteRes2 = path.isAbsolute("home/");
console.log(`is Absolute: ${isAbsoluteRes2}`); // false

const pathToFile = path.format({
  dir: "d:/nodejs/html/js",
  base: "app.js",
});
console.log(`Path String:: ${pathToFile}`);

let pathObj = path.parse("d:/nodejs/html/js/app.js");
console.log(pathObj);

const pathToDir = path.join("/home", "js", "dist", "app.js");
console.log(`pathToDir:: ${pathToDir}`);

const pathToDir2 = path.resolve("/home", "js", "dist", "app.js");
console.log(`pathToDir:: ${pathToDir2}`);

const normalizedPath = path.normalize("/foo/bar//baz/abc/xyz/..");
console.log(normalizedPath);

const normalizedPath2 = path.normalize("../process/process_demo_1.js");
console.log(path.parse(normalizedPath2));
