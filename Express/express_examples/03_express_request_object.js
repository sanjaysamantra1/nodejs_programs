const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const { method, body, protocol, params, ip } = req;
  console.log(method, body, protocol, params, ip);
  res.send("Server Working!!!");
});


app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
