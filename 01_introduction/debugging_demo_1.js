console.log("Program Execution Started");
function fun3() {
  console.log("fun3 started");
  console.log("fun3 ended");
}
function fun2() {
  console.log("Fun2 started");
  fun3();
  console.log("Fun2 ended");
}
function fun1() {
  var a = 5,
    b = 6,
    c = 7,
    d = 8;
  console.log(a);
  console.log(b);
  fun2();
  console.log(c);
  console.log(d);
}
fun1();
console.log("Program Execution completed");
