const express = require('express');
const fs = require('fs');
const { formidable } = require('formidable');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <h2>With Node.js <code>"http"</code> module</h2>
        <form action="/upload" enctype="multipart/form-data" method="post">
          <div>Text field title: <input type="text" name="title" /></div>
          <div>File: <input type="file" name="myFiles" multiple="multiple" /></div>
          <input type="submit" value="Upload" />
        </form>
      `);
})
app.post('/upload', async (req, res) => {
    let options = {
        maxFileSize: 1024 * 5, // max 5 kb
        filter: function ({ mimetype }) {
            return mimetype && mimetype.includes('image')
        }
    }
    // const formidableObj = formidable({});
    const formidableObj = formidable(options);
    try {
        let [fields, files] = await formidableObj.parse(req);
        for (let fileObj of files.myFiles) {
            let oldPath = fileObj.filepath;
            let newPath = `${__dirname}/assets/${fileObj.originalFilename}`;
            let imageFile = fs.readFileSync(oldPath);
            fs.writeFileSync(newPath, imageFile);
        }
        res.send('File Uploaded Succesfully...')
    } catch (err) {
        res.send('Please upload only image files with size <= 5kb')
    }
});

app.listen(5000, () => { console.log('server running at 5000') })