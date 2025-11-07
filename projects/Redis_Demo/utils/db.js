import mongoose from 'mongoose';

export async function connectDatabase() {
  await mongoose.connect('mongodb://127.0.0.1:27017/nareshit_sept_2025');
  console.log('Database connected!!!');
}