const express = require("express");
const app = express();
const port = 5000;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../Swagger_Demo_2/user-swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let users = [
  { id: 1, name: "sachin", sal: 5000, gender: "male" },
  { id: 2, name: "rahul", sal: 6000, gender: "male" },
  { id: 3, name: "mitali", sal: 5500, gender: "female" },
];

app.get("/", (req, res) => {
  res.send(`<h1>Server is Running fine...</h1>`);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = +req.params.id;
  const result = users.filter((user) => user.id === id);
  res.json(result);
});

app.get("/api/myusers", (req, res) => {
  const name = req.query.name;
  const result = users.filter((user) => user.name === name);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server listening on the port::::::${port}`);
});
