const express = require("express");
const app = express();

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/local";

connectToDB().catch((err) => console.log(err));

async function connectToDB() {
  await mongoose.connect(url);
}
const kittySchema = new mongoose.Schema({
  // structure
  name: String,
});
const Kitten = mongoose.model("Kitten", kittySchema); //model class

const sanjay = new Kitten({ name: "Sanjay Samantra" });
console.log(sanjay.name); // 'Silence'
sanjay.create((err, res) => {
  if (err) console.log(err);
  console.log("added successfully");
});

app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
