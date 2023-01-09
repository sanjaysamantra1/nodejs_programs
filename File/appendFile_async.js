var fs = require("fs");

//async
fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
  if (err) throw err;
  console.log("Content Appended!");
});
