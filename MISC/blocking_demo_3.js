const fs = require("fs");
// plz create a file with more content to see the result
fs.readFile("file1.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
fs.unlinkSync("file1.txt");
