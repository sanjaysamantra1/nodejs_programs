var fs = require("fs");
//un-blocking code with the help of callback function
fs.readFile("file1.txt", "utf8", function (err, data) {
  //doesn't wait and will read file asynchronously
  console.log(data);
});
console.log("Done!");
