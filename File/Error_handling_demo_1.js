const fs = require("fs");

// No Param CallBack
/* fs.writeFile("./content/file1.txt", "Sample text", function () {
  console.log("writting done");
}); */

// callBack(err,data)
fs.readFile("./content/file1.txt", "utf-8", function (err, data) {
  if (err) throw err;
  console.log(data);
});

// No Param CallBack - error should be handled manually
// even though it's a no param callback we have to add param in callback
/* fs.unlink("./content/file1.txt", function (err, data) {
  if (err) throw err;
  console.log("file deleted successfully");
}); */
