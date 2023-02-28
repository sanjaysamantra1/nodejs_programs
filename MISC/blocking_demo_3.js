// Dangers of Mixing Blocking and Non-Blocking Code
// File gets deleted before read

const fs = require("fs");

fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync("/file.md");
