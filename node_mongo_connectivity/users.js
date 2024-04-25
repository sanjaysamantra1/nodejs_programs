const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://0.0.0.0:27017');
async function connectToDB() {
    await client.connect();
    console.log('Connected successfully to mongoDB');
}

app.get('/users', async (req, res) => {
    try {
        const users = await client.db('march_4_2024').collection('users').find({}).toArray();
        res.json(users);
    } catch (err) {
        console.log(err)
    }
})

app.listen(5000, async () => {
    await connectToDB();
    console.log('Server Running on 5000')
});