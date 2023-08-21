const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("This is Home Route...");
});

app.listen(5000, () => {
  console.log(`Server is listening at http://localhost:5000`);
});
