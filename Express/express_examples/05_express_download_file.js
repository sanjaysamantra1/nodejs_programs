const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send(`<p>Please click the below link to download a file<br>
    <a href="http://localhost:5000/download">download</a>`);
});
app.get("/download", (req, res) => {
  res.download(path.resolve(__dirname, "./assets/images/bangalore.jpeg"));
});

app.listen(5000, () => {
  console.log("server is listening on port 5000....");
});
