const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRouter = require('./src/routes/employee_routes');

const app = express();
app.use(express.json());
app.use(cors());


const url = 'mongodb://localhost:27017/june_2024';
try {
    mongoose.connect(url);
} catch (err) {
    console.log(err)
}

app.use('/employees', employeeRouter)


app.listen(4000, () => {
    console.log('server running at 4000 port');
})

module.exports = app;

