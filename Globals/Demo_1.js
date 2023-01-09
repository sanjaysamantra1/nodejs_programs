/* GLOBALS  - NO WINDOW !!!!

__dirname  - path to current directory
__filename - file name
require    - function to use modules (CommonJS)
module     - info about current module (file)
process    - info about env where the program is being executed */

console.log(__dirname);
console.log(__filename);
console.log(this);

function f1() {
  console.log(this);
}
f1();
