console.time("test1");
for (let i = 1; i <= 10000; i++) {
  console.log("hi");
}
console.timeEnd("test1");

function f1() {
  console.log("i am f1");
}
console.time("timeTakenToExecuteF1");
f1();
console.timeEnd("timeTakenToExecuteF1");
