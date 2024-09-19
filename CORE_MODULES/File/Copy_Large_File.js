const fs = require('fs');
const path = require('path');

// Source and destination paths
const sourceFile = path.join(__dirname, 'largeFile.txt');
const destinationFile = path.join(__dirname, 'copiedLargeFile.txt');

// Create read and write streams
const readStream = fs.createReadStream(sourceFile);
const writeStream = fs.createWriteStream(destinationFile);

// Copy file using streams
readStream.pipe(writeStream);

// Handle stream events
readStream.on('error', (err) => {
    console.error('Error reading file:', err);
});
writeStream.on('error', (err) => {
    console.error('Error writing file:', err);
});
writeStream.on('finish', () => {
    console.log('File copied successfully');
});
