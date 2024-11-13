import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { createClient } from 'redis';
import { EmployeeModel } from './employee_model.js';

const app = express();
// middlewares
app.use(express.json());
app.use(cors());

async function connectToDB() {
    await mongoose.connect('mongodb://127.0.0.1/sept_2024');
    console.log('Database connection established');
}
const redisClient = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

app.get('/employees', async (req, res) => {
    try {
        let employees = await EmployeeModel.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
app.get('/employees/:id', async (req, res) => {
    let empId = req.params.id;
    const dataInRedis = await redisClient.get(empId);
    if (dataInRedis) {
        let output = JSON.parse(dataInRedis);
        res.json({ source: 'Redis', output })
    } else {
        try {
            let employee = await EmployeeModel.findById(empId);
            await redisClient.set(empId, JSON.stringify(employee), { EX: 60 * 5 });
            res.send({ source: 'Database', employee });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
})
app.post('/employees', async (req, res) => {
    const payload = req.body;
    try {
        let createResponse = await EmployeeModel.create(payload);
        await redisClient.set(createResponse['_id'] + "", JSON.stringify(createResponse), { EX: 60 * 5 });
        res.json(createResponse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
app.put('/employees/:id', async (req, res) => {
    let empId = req.params.id;
    const payload = req.body;
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(empId, payload, { new: true });
        if (updatedEmployee) {
            await redisClient.set(updatedEmployee['_id'] + "", JSON.stringify(updatedEmployee), { EX: 60 * 5 });
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
app.delete('/employees/:id', async (req, res) => {
    const empId = req.params.id;
    try {
        const employee = await EmployeeModel.findByIdAndDelete(empId);
        if (employee) {
            req.redis.del(empId); // Remove from cache
            res.json({ message: 'Employee deleted' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


app.listen(5000, async () => {
    await connectToDB();
    console.log('app running at 5000')
});

