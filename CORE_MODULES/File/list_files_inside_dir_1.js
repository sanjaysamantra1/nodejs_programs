const fs = require("fs");

fs.readdir("./content/", function (err, files) {
  if (err) throw err;
  console.log(files);
});
