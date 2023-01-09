import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {};

const client = await MongoClient.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const coll = client.db("sanjaydb1").collection("users");
const cursor = coll.find(filter);
const result = await cursor.toArray();
console.log(result)
await client.close();
