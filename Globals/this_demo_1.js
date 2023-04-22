console.log(this); // {}

function f1() {
  console.log(this); //Object [global]
}
f1();

function f2() {
  "use strict";
  console.log("f2...", this); //undefined
}
f2();
