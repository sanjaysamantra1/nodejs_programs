function f1() {
  console.log("f1");
  f2();
}
function f2() {
  console.log("f1");
  f3();
}
function f3() {
  console.log("f3");
  console.trace();
}
f1();
