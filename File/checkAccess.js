const fs = require("fs");

fs.access("./content/first.txt", fs.W_OK, (err, res) => {
  console.log("has access to write");
});
fs.access("./content/first.txt", fs.R_OK, (err, res) => {
  console.log("has access to Read");
});
fs.access("./content/first.txt", fs.X_OK, (err, res) => {
  console.log("has access to execute");
});
