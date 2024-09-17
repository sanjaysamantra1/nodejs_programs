const fs = require('fs');
const path = require('path');

// Path to the file you want to watch
const fileToWatch = path.join(__dirname, 'watchedFile.txt');

// Watch the file for changes
fs.watch(fileToWatch, (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} has been ${eventType}`);
        if (eventType === 'change') {
            fs.readFile(fileToWatch, 'utf-8', (err, data) => {
                if (err) throw err;
                console.log('New content:', data);
            });
        }
    }
});

// Writing data to simulate file changes
setTimeout(() => {
    fs.writeFile(fileToWatch, 'New content added!', (err) => {
        if (err) throw err;
        console.log('Content added to the file');
    });
}, 3000);
