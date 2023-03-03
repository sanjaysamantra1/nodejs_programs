const path = require("path");

console.log(path.join()); // .
console.log(path.resolve()); // E:\Training\UI\UI_progs\NodeJS\Path

let res1 = path.join("hello", "/path", "me"); // hello\path\me
let res2 = path.resolve("hello", "path", "me"); // E:\path\me
console.log(res1, res2);

let res3 = path.join("/hello", "/path", "/me"); // \hello\path\me
let res4 = path.resolve("/hello", "/path", "/me"); // E:/me
console.log(res3, res4);

