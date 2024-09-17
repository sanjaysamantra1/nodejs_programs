const fs = require('fs');

fs.watch('example.txt', (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} has been modified.`);
        if (eventType === 'change') {
            fs.readFile('example.txt', 'utf-8', (err, data) => {
                if (err) throw err;
                console.log(`Updated file content: ${data}`);
            });
        }
    } else {
        console.log('Filename not provided');
    }
});

console.log('Watching for file changes...');
