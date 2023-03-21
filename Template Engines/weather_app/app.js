let express = require("express");
let axios = require("axios");
let app = express();
let port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send(`<h1>Server is running...</h1>`);
});

app.get("/weather", async (req, res) => {
  let city = req.query.city;
  let url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
  // calling API to get weather Data
  const response = await axios.get(url);
  res.render("index", { title: "Weather App", result: response.data });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Running on port ${port}`);
});
