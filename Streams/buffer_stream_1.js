const fs = require('fs');

const readableStream = fs.createReadStream('day_52_notes.txt');
const writableStream = fs.createWriteStream('day_52_notes_2.txt');

readableStream.on('data', (chunk) => {
    console.log('Received chunk');
    writableStream.write(chunk);
});
