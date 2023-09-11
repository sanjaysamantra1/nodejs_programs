const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.get("/", function (req, res) {
  res.send("<h1>Server Running...</h1>");
});
app.get("/restaurants", async function (req, res) {
  let connection;
  try {
    console.log("Connecting to database...");
    const myAtlasURL = "mongodb+srv://sanjaysamantra1:july2023@cluster0.ga81v5y.mongodb.net/?retryWrites=true&w=majority";
    connection = await MongoClient.connect(myAtlasURL);
    console.log("Connection Established...");
    const restaurants = connection.db("sample_restaurants").collection("restaurants").find({});
    const result = await restaurants.toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
