// timeout_vs_immediate.js
const fs = require("fs");

fs.readFile("./file_1.txt", () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
  Promise.resolve().then(() => {
    console.log("Promise resolved");
  });
  process.nextTick(() => {
    console.log("next tick");
  });
});
