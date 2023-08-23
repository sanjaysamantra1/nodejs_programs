const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is Running");
});
app.get("/html", (req, res) => {
  res.send("<p>This is <b><i>HTML</i></b> Response from Server");
});
app.get("/htmlFile", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./assets/templates/index.html"));
});
app.get("/imageFile", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./assets/images/bangalore.jpeg"));
});
app.get("/downloadFile", (req, res) => {
    res.download(path.resolve(__dirname, "./assets/images/bangalore.jpeg"));
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(5000, () => {
  console.log("server is listening at http://localhost:5000");
});
