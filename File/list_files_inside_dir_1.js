const fs = require("fs");

fs.readdir("./content", (err, files) => {
  if (err) throw err;

  console.log(files); // array of file Names
});
