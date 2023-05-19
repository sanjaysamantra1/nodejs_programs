// import express
import express from "express";
let app = express();

//import mongodb
import { MongoClient } from "mongodb";
const mongoClient = new MongoClient("mongodb://localhost:27017");
let connection = await mongoClient.connect();

//import Redis
import { createClient } from "redis";
let redisClient = createClient();

// Search products By Size
app.get("/products", async (req, res) => {
  await redisClient.connect();
  let userInput = req.query.size || req.query.Size || "Medium";

  let result = await redisClient.get(userInput);
  if (result) {
    console.log("Returned from Redis Cache");
    res.send(JSON.parse(result));
  } else {
    console.log("Returned from DB");
    const products = connection
      .db("april2023")
      .collection("products")
      .find({ Size: userInput });
    const result = await products.toArray();
    await redisClient.set(userInput, JSON.stringify(result),{EX:3600,NX:true});
    res.json(result);
  }
  await redisClient.disconnect();
});

app.listen(5000, () => {
  console.log("listening on port 5000 http://localhost:5000/products");
});
