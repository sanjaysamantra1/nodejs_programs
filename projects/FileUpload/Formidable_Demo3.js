const express = require("express");
const formidable = require("formidable");
const app = express();
const fs = require('fs')

app.get("/", (req, res) => {
    res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>Text field title-2: <input type="text" name="title2" /></div>
      <div>File: <input type="file" name="myFiles" multiple /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});
let options = {
    multiples: true,
    maxFileSize: 1024 * 1024 * 5, // Max - 5kb
    filter: function ({ name, originalFilename, mimetype }) {
        return mimetype && mimetype.includes('image')
    }
}
app.post("/api/upload", (req, res) => {
    console.log('upload route')
    const formidableObj = formidable(options);
    formidableObj.parse(req, (err, fields, files) => {
        for (file of files.myFiles) {
            let oldPath = file.filepath;
            let newPath = `${__dirname}/assets/${file.originalFilename}`;
            let imageFile = fs.readFileSync(oldPath);
            fs.writeFileSync(newPath, imageFile);
        }
        res.send('File Uploaded Successfully!!')
    });
});
app.listen(5000, () => {
    console.log("Server listening on http://localhost:5000");
});