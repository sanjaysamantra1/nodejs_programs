const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectToDB } = require('./config/db.config');
const employeeRouter = require('./routes/employee_routes');
const authRouter = require('./routes/auth_routes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/employees', employeeRouter)
app.use('/auth', authRouter)



app.listen(5000, () => {
    connectToDB()
    console.log(`app Running at 5000 port`)
});
