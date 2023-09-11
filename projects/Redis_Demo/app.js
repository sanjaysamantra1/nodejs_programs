let express = require("express");
let axios = require("axios");
let redis = require("redis");

// Redis Client
let redisClient = redis.createClient({ host: "localhost", port: 6379 });

let app = express();
app.get("/data", (req, res) => {
  let countryName = req?.query?.country || "india";
  const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${countryName}`;

  return redisClient.get(countryName, (err, result) => {
    if (result) {
      const output = JSON.parse(result);
      res.send(output);
    } else {
      console.log("No data found in redis cache for country: " + countryName);
      axios.get(url).then((response) => {
        const output = response.data;
        // set data with expiry time
        redisClient.setex(
          countryName,
          3600,
          JSON.stringify({ source: "Redis Cache", output: output })
        );
        // send the API response to client
        res.send({ source: "API Response", output: output });
      });
    }
  });
});

app.listen(5000, () => {
  console.log("server listening on http://localhost:5000");
});
