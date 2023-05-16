let express = require("express");
let app = express();
let mongoose = require("mongoose");

app.use(express.json());

// create a connection using mongoose
mongoose
  .connect("mongodb://localhost:27017/april2023")
  .then(() => console.log("Connected! successfully"))
  .catch((err) => console.log("Couldn't connect", err));

// create Schema & Model
let productSchema = new mongoose.Schema({
  id: Number,
  product_name: String,
  category: String,
  category_id: Number,
  Price: Number,
  Size: String,
  Image: String,
  Color: String,
  Brand: String,
});
let productModel = mongoose.model("products", productSchema);

// get all products
app.get("/products", async (req, res) => {
  try {
    let products = await productModel.find({});
    res.json(products);
  } catch (e) {
    console.error(e);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let products = await productModel.find({ id: req.params.id }).exec();
    res.json(products);
  } catch (e) {
    console.error(e);
  }
});

app.post("/products", async (req, res) => {
  try {
    let newProduct = new productModel();
    newProduct.id = req.body.id;
    newProduct.product_name = req.body.product_name;
    newProduct.category = req.body.category;
    newProduct.category_id = req.body.category_id;
    newProduct.Price = req.body.Price;
    newProduct.Size = req.body.Size;
    newProduct.image = req.body.image;
    newProduct.Color = req.body.Color;
    newProduct.Brand = req.body.Brand;
    await newProduct.save();
    res.send("Product Added Successfully!!");
  } catch (e) {
    console.error(e);
  }
});

app.post("/products-add", async function (req, res) {
  const payload = req.body;
  try {
    await productModel.create(payload);
    res.send("Product created successfully");
  } catch (e) {
    console.error(e);
  }
});

app.patch("/products/:id", async function (req, res) {
  const id = req.params.id;
  const payload = req.body;
  try {
    await productModel.updateOne({ id }, payload);
    res.send("Product updated successfully!!!");
  } catch (err) {
    console.log(err);
  }
});
app.delete("/products/:id", async function (req, res) {
  const id = +req.params.id;
  try {
    await productModel.deleteOne({ id });
    res.send("Product Deleted successfully!!!");
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server Listening on port 5000");
});
