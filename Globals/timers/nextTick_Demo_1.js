console.log("GLobal Scope Starts...");
function displayA() {
  console.log("AAAAA");
}
function displayB() {
  console.log("BBBBB");
}
function displayC() {
  console.log("CCCCC");
}
function displayD() {
  console.log("DDDDD");
}
process.nextTick(displayA); // Before the Next Iteration For Event Loop Starts
setTimeout(displayB);
setImmediate(displayC);
Promise.resolve().then(displayD); // Microtask Callbacks
console.log("GLobal Scope Ends...");
