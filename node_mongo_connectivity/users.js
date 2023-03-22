const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.get("/", function (req, res) {
  res.send("<h1>Server Running...</h1>");
});
app.get("/users", async function (req, res) {
  const client = await MongoClient.connect("mongodb://localhost:27017/");
  const users = client.db("march2023").collection("users").find({});
  const result = await users.toArray();
  res.json(result);
  await client.close();
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
