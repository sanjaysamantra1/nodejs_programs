let express = require("express");
const app = express();
let axios = require("axios");
let redis = require("redis");
let port = process.env.PORT || 5000;

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

app.get("/data", async (req, res) => {
  let userInput = req.query.country || "India";
  const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

  // Check if the data is present in Redis Cache
  return client.get(userInput, (err, result) => {
    if (result) {
      const output = JSON.parse(result);
      res.send(output);
    } else {
      console.log("No data found in redis cache for country: " + userInput);
      axios.get(url).then((response) => {
        const output = response.data;
        // set data with expiry time
        client.setex(
          userInput,
          3600,
          JSON.stringify({ source: "Redis Cache", output: output })
        );
        // send the API response to client
        res.send({ source: "API Response", output: output });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
