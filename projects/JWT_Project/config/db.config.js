const mongoose = require('mongoose');

function connectDB(dbName = 'nareshit_sept_2025') {
    mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
        .then(() => console.log('Connected To Database!'))
        .catch(err=>{console.log('Error connecting DB')})
}

module.exports = { connectDB };