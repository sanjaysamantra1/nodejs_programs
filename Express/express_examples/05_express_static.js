const express = require("express");
const path = require("path");
const app = express();

// setup static and middleware
app.use(express.static("./assets"));

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/htmlFile", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./assets/templates/index.html"));
});
app.get("/imageFile", function (req, res) {
  res.sendFile(
    path.resolve(path.resolve(__dirname, "./assets/images/bangalore.jpeg"))
  );
});
app.get("/downloadFile", function (req, res) {
  res.download(
    path.resolve(path.resolve(__dirname, "./assets/images/bangalore.jpeg"))
  );
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000....");
});
