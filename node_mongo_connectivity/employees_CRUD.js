const express = require('express');
const app = express();
app.use(express.json());
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://0.0.0.0:27017');

async function connectToDB() {
    await client.connect();
    console.log('Connected successfully to mongoDB');
}

app.get('/employees', async (req, res) => {
    try {
        const employees = await client.db('march_4_2024').collection('employees').find({}).toArray();
        res.json(employees);
    } catch (err) {
        console.log(err)
    }
});
app.get('/employees/:id', async (req, res) => {
    const employeeId = +req.params.id;
    try {
        const employees = await client.db('march_4_2024').collection('employees').find({ eId: employeeId }).toArray();
        res.json(employees[0]);
    } catch (err) {
        console.log(err)
    }
});
app.post('/employees', async (req, res) => {
    const payload = req.body;
    try {
        await client.db('march_4_2024').collection('employees').insertOne(payload);
        res.send('Employee Added Successfully');
    } catch (err) {
        console.log(err)
    }
});
app.patch('/employees/:id', async (req, res) => {
    const employeeId = +req.params.id;
    const payload = req.body;
    try {
        await client.db('march_4_2024').collection('employees').updateOne({ eId: employeeId }, { $set: payload }, { upsert: true });
        res.send('Employee Updated Successfully');
    } catch (err) {
        console.log(err)
    }
});
app.delete('/employees/:id', async (req, res) => {
    const employeeId = +req.params.id;
    try {
        await client.db('march_4_2024').collection('employees').deleteOne({ eId: employeeId });
        res.send('Employee Deleted Successfully');
    } catch (err) {
        console.log(err)
    }
});

app.listen(5000, async () => {
    await connectToDB();
    console.log('Server Running on 5000')
});