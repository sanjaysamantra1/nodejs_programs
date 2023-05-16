let express = require("express");
const { MongoClient } = require("mongodb");
let app = express();

app.use(express.json());

let db;
async function establishConnection() {
  // Connection URL
  const url = "mongodb://localhost:27017";
  const mongoClient = new MongoClient(url);
  let connection = await mongoClient.connect();
  console.log("Connection established Successfully");
  db = connection.db("april2023");
}
establishConnection();

app.get("/", function (req, res) {
  res.send("Server Running...");
});
app.get("/products", async function (req, res) {
  const products = db.collection("products").find({});
  let productsArr = await products.toArray();
  res.json(productsArr);
});

app.get("/products/:id", async (req, res) => {
  const prodId = +req.params.id;
  const product = db.collection("products").find({ id: prodId });
  let finalResult = await product.toArray();
  res.json(finalResult);
});

app.post("/products", async (req, res) => {
  const payload = req.body;
  db.collection("products").insertOne(payload);
  res.send("Product successfully Added");
});

app.patch("/products/:id", (req, res) => {
  const prodId = +req.params.id;
  const payload = req.body;
  db.collection("products").updateOne(
    { id: prodId },
    { $set: payload },
    {
      upsert: true,
    }
  );
  res.send("Product Updated successfully");
});

app.delete("/products/:id", function (req, res) {
  const prodId = +req.params.id;
  db.collection("products").deleteOne({ id: prodId });
  res.send(`product ${prodId} deleted successfully`);
});

app.listen(5000, () => {
  console.log("Server Listening on port 5000");
});
