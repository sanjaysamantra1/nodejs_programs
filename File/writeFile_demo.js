var fs = require("fs");

//async
fs.writeFile("./content/output.txt", "Creates and writes some content", (err, res) => {
  console.log("Writing Done...");
});
