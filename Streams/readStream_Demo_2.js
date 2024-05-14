const fs = require("fs");
console.time("readFile");
const readStream = fs.createReadStream("file1.txt", { highWaterMark: 200 });

readStream.on("data", (chunk) => {
  console.log(`Read ${chunk.length} bytes\n"${chunk.toString()}"\n`);
});
console.timeEnd("readFile");
