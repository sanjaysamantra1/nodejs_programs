const express = require("express");
const bodyParser = require("body-parser");
const formidable = require("formidable");
const fs = require("fs");
const app = express();
const port = 5000;

//static file path
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});
const options = {
  filter: function ({ name, originalFilename, mimetype }) {
    console.log("mimetype: " + mimetype);
    // allow only images
    return mimetype && mimetype.includes("image");
  },
};
app.post("/profile", (req, res) => {
  let form = new formidable.IncomingForm(options);
  form.parse(req, (err, fields, files) => {
    let oldPath = files.fileName.filepath;
    let newPath = `${__dirname}/public/images/${files.fileName.originalFilename}`;
    console.log(">>>old path>>", oldPath);
    console.log(">>>new path>>", newPath);

    let imageFile = fs.readFileSync(oldPath);
    fs.writeFile(newPath, imageFile, function (err) {
      if (err) console.log(err);
      return res.send("Successfully uploaded");
    });
  });
});

app.listen(port, () => {
  console.log(`Listing to port ${port}`);
});
