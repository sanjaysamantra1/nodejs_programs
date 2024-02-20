const fs = require("fs");

fs.watch(file, (event, filename) => {
    console.log(`${filename} file Changed`);
});