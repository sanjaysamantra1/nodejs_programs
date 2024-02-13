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
      <div>File: <input type="file" name="myFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});
app.post("/api/upload", (req, res) => {
    const formidableObj = formidable();
    formidableObj.parse(req, (err, fields, files) => {
        let oldPath = files.myFiles.filepath;
        let newPath = `${__dirname}/assets/${files.myFiles.originalFilename}`;
        let imageFile = fs.readFileSync(oldPath)
        fs.writeFileSync(newPath, imageFile)
        res.send('File Uploaded Successfully!!')
    });
});
app.listen(5000, () => {
    console.log("Server listening on http://localhost:5000");
});