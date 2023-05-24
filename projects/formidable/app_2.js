const express = require("express");
const formidable = require("formidable");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  res.send(`
    <center>
      <h2>Formidable Example</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <p>Enter File Name: <input name='fileTitle' /></p>
        <p>Choose File: <input name='myFiles' type='file' multiple=true /></p>
        <input type="submit" value="upload" />
      </form>
    <center>
  `);
});

const options = {
  filter: function ({ name, originalFilename, mimetype }) {
    console.log("mimetype: " + mimetype);
    // allow only images
    return mimetype && mimetype.includes("image");
  },
};

app.post("/api/upload", (req, res, next) => {
  const formidableObj = formidable(options);
  formidableObj.parse(req, (err, fields, files) => {
    let oldPath = files.myFiles.filepath;
    let newPath = `${__dirname}/public/images/${files.myFiles.originalFilename}`;
    console.log(">>>old path>>", oldPath);
    console.log(">>>new path>>", newPath);

    let imageFile = fs.readFileSync(oldPath);
    fs.writeFile(newPath, imageFile, function (err) {
      if (err) console.log(err);
      return res.send("Successfully uploaded");
    });
  });
});

app.listen(5000, () => {
  console.log("Server listening on http://localhost:5000");
});
