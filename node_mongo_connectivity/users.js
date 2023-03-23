const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.get("/", function (req, res) {
  res.send("<h1>Server Running...</h1>");
});
app.get("/users", async function (req, res) {
  let connection;
  try {
    connection = await MongoClient.connect("mongodb://localhost:27017/");
    console.log("Connection Established", connection);
    const users = connection.db("march2023").collection("users").find({});
    const result = await users.toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
  } finally {
    await connection.close();
  }
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
