var fs = require("fs");

// async
fs.appendFile("./content/mynewfile1.txt", "Hello content! \n", function (err) {
  if (err) throw err;
  console.log("Content Appended!");
});

// sync
fs.appendFileSync("input.txt", "Hello content!", () => { });
