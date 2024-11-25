const fs = require('fs');
const { Buffer } = require('buffer');

fs.readFile('day_52_notes.txt', (err, data) => {
    if (err) throw err;
    console.log(data); // prints the buffer
    console.log(data.toString()); // buffer to string
});

// How to write binary data to a file
const file_content = 'Hello,Good Morning!!!';
const buffer = Buffer.from(file_content);

fs.writeFile('file_1.txt', buffer, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});