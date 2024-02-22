const fs = require('node:fs');
fs.stat('./content/first.txt', (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stats.isFile())
    console.log(stats.isDirectory())
    console.log(stats.size+' KB')
});