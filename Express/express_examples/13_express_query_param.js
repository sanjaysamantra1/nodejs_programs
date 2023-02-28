const express = require("express");
const app = express();
var PORT = 5000;

app.get("/user", function (req, res) {
  const { name, age } = req.query;
  console.log(`Name: ${name} Age: ${age}`);
  res.json({ name, age });
});

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT", PORT);
});
