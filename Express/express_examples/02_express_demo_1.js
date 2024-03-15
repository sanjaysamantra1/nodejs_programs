const express = require("express");
const users = require("./users.json");
const port = 5000;

const app = express();

app.get("/users", function (req, res) {
  res.write(JSON.stringify(users));
});
app.get("/users/:id", function (req, res) {
  res.send("1 user");
});
app.post("/users", function (req, res) {
  res.send("post ");
});
app.put("/users/:id", function (req, res) {
  res.send("PUT ");
});
app.patch("/users/:id", function (req, res) {
  res.send("PATCH ");
});
app.delete("/users/:id", function (req, res) {
  res.send("DELETE ");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
