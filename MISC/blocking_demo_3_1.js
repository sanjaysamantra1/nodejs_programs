let fs = require('fs');

fs.readFile("./file1.txt", (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data.toString());
  fs.unlink("./file1.txt", (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
