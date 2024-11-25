// read an image file , resize 100x100 store with a diff name
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express();

app.get('/getData', (req, res) => {
    const imgPath = path.join(__dirname, 'nodejs_logo.png');
    fs.readFile(imgPath, (err, data) => {
        if (err) {
            console.error('Error while reading image file', err);
            return;
        }
        console.log(data); // buffer data

        // set content-type
        res.setHeader('Content-Type', 'image/png');
    
        // send the image buffer
        res.send(data);
    });

});

app.listen(5000, () => {
    console.log('server running at 5000 port')
});

