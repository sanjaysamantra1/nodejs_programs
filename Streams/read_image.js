// read an image file , resize 100x100 store with a diff name
const fs = require('fs')
const path = require('path')

const imgPath = path.join(__dirname, 'nodejs_logo.png');
fs.readFile(imgPath, (err, data) => {
    if (err) {
        console.error('Error while reading image file', err);
        return;
    }
    console.log(data); // buffer data

    fs.writeFile('nodejs_logo_2.png', data, (err) => {
        if (err) throw err;
        console.log('nodejs_logo file has been saved!');
    })
})