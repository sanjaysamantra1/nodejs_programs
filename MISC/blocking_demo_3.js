const fs = require("fs");
fs.readFile("file1.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
fs.unlinkSync("file1.txt");
