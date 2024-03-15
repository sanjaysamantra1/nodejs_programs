import express from "express";
import axios from "axios";
import { createClient } from "redis";

const redisClient = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

let app = express();

app.get('/fetchData', async (req, res) => {

    let countryName = req?.query?.country || "india";
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${countryName}`;

    const dataInRedis = await redisClient.get(countryName);
    if (dataInRedis) {
        console.log(('Data found in Redis'))
        let output = JSON.parse(dataInRedis)
        res.send({ source: 'REDIS', output });
    } else {
        console.log('Data not found in Redis');
        let response = await axios.get(url);
        let output = response.data;

        // Store data in REDIS
        await redisClient.set(countryName, JSON.stringify(output),{
            EX: 60, // Expiry Time in Seconds
            NX: true, // NX - Set Only when it doesn't exist
          });
        console.log('data stored in REDIS')

        res.send({ source: 'API', output });
    }
})

app.listen(5000)