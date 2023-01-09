var fs = require("fs");

// Asynchronous read
fs.readFile("input.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log(data); // output is the raw buffer
  console.log(data.toString()); // output is String
});
