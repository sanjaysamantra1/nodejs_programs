const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./config/db.config');
const employeeRouter = require('./routes/employee_routes');
const authRouter = require('./routes/auth_routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/employees', employeeRouter)
app.use('/auth', authRouter)

app.listen(4000, () => {
    connectToDB();
    console.log('server running at 4000 port');
})

