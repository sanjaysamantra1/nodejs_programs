const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("This is home page");
});

app.get("/about", (req, res) => {
  res.status(200).send("This is about page");
});
app.get("/contact", (req, res) => {
  res.status(200).send("This is contact-us page");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
