const express = require('express')
const cors = require('cors')
const employeeRouter = require('./routes/employee_route');
const productRouter = require('./routes/product_route');
const authRouter = require('./routes/auth_route');
const postRouter = require('./routes/post_route');

const {connectDB} = require('./utils/db_utils');
const app = express();

// middlewares
app.use(express.json())
app.use(cors())

// use the routers
app.use('/employees', employeeRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.listen(3000, async() => {
    await connectDB()
    console.log("app started on port 3000");
});

