const mongoose = require('mongoose');

exports.connectToDB = function () {
    const url = 'mongodb://localhost:27017/june_2024';
    try {
        mongoose.connect(url);
        console.log('data base connected successfully')
    } catch (err) {
        console.log(err)
    }
}