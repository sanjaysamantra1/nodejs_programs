const express = require("express");
const formidable = require("formidable");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  res.send(`
    <center>
      <h2>Formidable Multiple file upload Example</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <p>Enter File Name: <input name='fileTitle' /></p>
        <p>Choose File: <input name='myFiles' type='file' multiple=true /></p>
        <input type="submit" value="upload" />
      </form>
    <center>
  `);
});

const options = {
  multiples: true,
  maxFileSize: 5 *1024*1024, // MAX 5 MB
  filter: function ({ name, originalFilename, mimetype }) {
    return mimetype && mimetype.includes("image");
  },
};

app.post("/api/upload", (req, res, next) => {
  const formidableObj = formidable(options);
  formidableObj.parse(req, (err, fields, files) => {
    for (file of files.myFiles) {
      let oldPath = file.filepath;
      let newPath = `${__dirname}/public/images/${file.originalFilename}`;
      let imageFile = fs.readFileSync(oldPath);
      fs.writeFile(newPath, imageFile, function (err) {
        if (err) console.log(err);
      });
    }
    return res.send("Successfully uploaded All Files");
  });
});

app.listen(5000, () => {
  console.log("Server listening on http://localhost:5000");
});
