import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URL!, {});

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error connecting to databasee');
});
db.once('open', () =>
  console.log('MongoDB database connection established successfully'),
);

export default db;
