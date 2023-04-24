console.log("new line");
setTimeout(() => {
  console.log("\nSet timeout callback executed");
}, 0);
setImmediate(() => {
  console.log("\nSet immediate callback executed");
});
/* Promise.resolve("resolved").then((result) => {
  console.log(`\nPromise was ${result}`);
}); */
