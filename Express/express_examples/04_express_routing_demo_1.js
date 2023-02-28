const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my home page");
});

app.get("/about", (req, res) => {
  res.status(200).send("Welcome to my about page");
});
app.get("/contact", (req, res) => {
  res.status(200).send("Welcome to my contact page");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
