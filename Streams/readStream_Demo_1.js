const fs = require('fs');

// Create a Readable stream from a file
const readStream = fs.createReadStream("file1.txt", 'utf8');

// Readable stream 'data' event handler
readStream.on('data', (chunk) => {
    console.log(`Received chunk: ${chunk}`);
});

// Readable stream 'end' event handler
readStream.on('end', () => {
    console.log('Data reading complete.');
});

// Readable stream 'error' event handler
readStream.on('error', (err) => {
    console.error(`Error occurred: ${err}`);
});