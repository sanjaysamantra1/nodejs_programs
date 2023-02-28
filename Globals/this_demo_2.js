console.log(this); // {}

function f1() {
  "use strict";
  console.log("f1...", this); //undefined
}
f1();

function f2() {
  console.log("f2.....", this); //Object [global]
}
f2();
