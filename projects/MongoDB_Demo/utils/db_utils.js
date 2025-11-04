const { MongoClient } = require('mongodb');

let db = null;
async function connectDB(url = 'mongodb://localhost:27017', dbName = 'nareshit_sept_2025') {
    if (db) {
        console.log('Databse ALready Connected!!')
        return db;
    }
    const client = new MongoClient(url);
    let connection = await client.connect();
    console.log('Connected successfully to Database');
    db = connection.db(dbName);
}
function getDB() {
    if (!db) {
        throw new Error('Database not initialized. plz call connectDB first!!! ')
    }
    return db;
}

module.exports = {connectDB,getDB};