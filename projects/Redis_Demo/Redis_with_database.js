import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';
import { connectDatabase } from './utils/db.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/employees', employeeRoutes);

app.listen(3000, async () => {
  await connectDatabase();
  console.log('Express server started on port 3000');
});