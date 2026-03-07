const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'nareshit_jan_2026';
const client = new MongoClient(url);
let db;

const connectDB = async () => {
    try {
        await client.connect();
        console.log('MongoDB Connected successfully');
        db = client.db(dbName);
    } catch (err) {
        console.log(err)
    }
}
const getDB = () => {
    return db;
}
module.exports = {
    connectDB, getDB
}