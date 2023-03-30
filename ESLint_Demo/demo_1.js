console.log(add);
var add = "bangalore";

var foo = {
  bar: "baz",
  bar: "qux",
};
console.log(foo);

function f1() {
  let x = 1;
  return x;
  x = 3; // this will never execute
}
f1();

let name = "100";
let name2 = 100;

if (name == name2) {
  console.log("HIiiii");
}

let f2 = () => "this is f2";
console.log(f2())