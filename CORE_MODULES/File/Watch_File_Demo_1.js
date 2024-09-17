const fs = require("fs");

fs.watch('./users.json', (event, filename) => {
    console.log(`${filename} file Changed`);
});