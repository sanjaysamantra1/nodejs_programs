import express from "express";
import axios from "axios";
import { createClient } from "redis";

let port = 5000;
let app = express();

let redisClient = createClient();

app.get("/data", async (req, res) => {
  await redisClient.connect();
  let countryName = req.query.country || "india";
  const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${countryName}`;

  // check if data is available in Redis Cache
  let result = await redisClient.get(countryName);
  if (result) {
    const output = JSON.parse(result);
    res.send(output);
  } else {
    let apiResponse = await axios.get(url);
    const output = apiResponse.data;
    await redisClient.set(
      countryName,
      JSON.stringify({ source: "Redis Cache", output }),
      {
        EX: 60, // Expiry Time in Seconds
        NX: true, // NX - Set Only when it doesn't exist
      }
    );
    res.send({ source: "API Response", output });
  }
  await redisClient.disconnect();
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
