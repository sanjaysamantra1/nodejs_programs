console.log("Program started");
const a = 10;
const b = 5;

function add(a, b) {
  console.log(a + b);
}
add(a,b);

function f2() {
  console.log("f2 started");
  console.log("f2 ended");
}
function f1() {
  console.log("f1 started");
  f2();
  console.log("f1 ended");
}
f1();

console.log("program ended");
