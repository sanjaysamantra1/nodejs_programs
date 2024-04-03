var fs = require("fs");

//async
fs.rename("mynewfile1.txt", "myrenamedfile.txt", function (err) {
  if (err) throw err;
  console.log("File Renamed!");
});

//sync
try {
  fs.renameSync("mynewfile1.txt", "myrenamedfile.txt");
  console.log("renamed successfully");
} catch (err) {
  console.error("there was an error:", err.message);
}
