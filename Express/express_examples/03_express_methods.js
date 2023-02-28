const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server Working!!!");
});
app.get("/users", (req, res) => {
  res.send("Get All Users");
});
app.post("/user", (req, res) => {
  res.send("Got a POST request");
});
app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});
app.patch("/user", (req, res) => {
  res.send("Got a PATCH request at /user");
});
app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
