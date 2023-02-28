const { default: axios } = require("axios");
const express = require("express");
const app = express();
var PORT = 5000;

app.get("/", function (req, res) {
  res.send("<h1>Server is running...</h1>");
});
app.get("/temp", async function (req, res) {
  const myUrl = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef29 `;
  const response = await axios.get(myUrl);
  res.send(
    `<h1>City Name is: ${req.query.city} & Temperature is: ${response.data.main.temp}</h1>`
  );
});

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT", PORT);
});
