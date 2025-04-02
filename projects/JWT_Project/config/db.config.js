const mongoose = require('mongoose');

exports.connectToDB = function () {
    const url = 'mongodb://127.0.0.1/march_2025';
    try {
        mongoose.connect(url);
    } catch (err) {
        console.log(err);
    }
}