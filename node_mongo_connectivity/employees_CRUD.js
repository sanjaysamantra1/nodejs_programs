const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoClient = require("mongodb").MongoClient;

let conn;
async function connectToDB() {
  try {
    conn = await mongoClient.connect("mongodb://0.0.0.0:27017");
    console.log("Connection established...");
  } catch (e) {
    console.log(e);
  }
}

app.get("/", (req, res) => {
  res.send("<h1>Server Is Running fine</h1>");
});
app.get("/employees", async (req, res) => {
  const records = conn.db("july2023").collection("employees").find({});
  const employees = await records.toArray();
  res.status(200).json(employees);
});
app.get("/employees/:id", async (req, res) => {
  const employeeId = +req.params.id;
  const records = conn
    .db("july2023")
    .collection("employees")
    .find({ id: employeeId });
  const employees = await records.toArray();
  res.status(200).json(employees);
});
app.post("/employee", async (req, res) => {
  const payload = req.body;
  conn.db("july2023").collection("employees").insertOne(payload);
  res.status(201).send("Employee Added successfully...");
});

app.patch("/employees/:id", (req, res) => {
  const empId = +req.params.id;
  const payload = req.body;
  conn.db("july2023").collection("employees").updateOne({ id: empId },{ $set: payload },{upsert:true});
  res.send("Employee Updated successfully");
});

app.delete("/employees/:id", async (req, res) => {
  const employeeId = +req.params.id;
  conn.db("july2023").collection("employees").deleteOne({ id: employeeId });
  res.status(200).send("Employee deleted successfully");
});

app.listen(5000, () => {
  connectToDB();
  console.log("listening at http://localhost:5000");
});
