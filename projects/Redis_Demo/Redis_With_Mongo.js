import express from "express";
import { createClient } from "redis";
import { MongoClient } from 'mongodb';
let app = express();

const url = 'mongodb://0.0.0.0:27017';
const dbName = 'dec2023';
const collName = 'users';
let connection;
async function connectToDB() {
    connection = await MongoClient.connect(url);
    console.log('Connected successfully to MongoDB');
}

const redisClient = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

app.get('/', (req, res) => {
    console.log('Home route')
    res.send('Home')
})
app.get('/users/:id', async (req, res) => {
    let userId = req.params.id;
    let dataInRedis;
    dataInRedis = await redisClient.get(userId);
    if (dataInRedis) {
        console.log(('Data found in Redis'))
        let output = JSON.parse(dataInRedis)
        res.send({ source: 'REDIS', output });
    } else {
        console.log('Data not found in Redis');
        const user = await connection.db(dbName).collection(collName).findOne({ id: +userId });
        // Store data in REDIS
        await redisClient.set(userId, JSON.stringify(user));
        console.log('data stored in REDIS')
        res.send({ source: 'Mongo DB', user });
    }
});
app.listen(5000, () => {
    connectToDB();
    console.log('Server Started')
})