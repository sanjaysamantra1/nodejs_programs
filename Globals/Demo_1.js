/* GLOBALS  - NO WINDOW !!!!

__dirname  - path to current directory
__filename - file name
require    - function to use modules (CommonJS)
module     - info about current module (file)
process    - info about env where the program is being executed */

console.log("current directory:: ", __dirname);
console.log("current file name:: ", __filename);
console.log("this value in global scope::", this);

function f1() {
  console.log("this value inside function:: ", this);
}
f1();
