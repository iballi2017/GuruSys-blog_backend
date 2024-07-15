import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import env from './env';
dotenv.config({ path: path.join(__dirname, '../.env') });



const MONGO_URI = `mongodb://127.0.0.1:27017/${env.DATABASE_USERNAME}`;

// const MONGO_URI = `mongodb+srv://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@cluster0.flcgahs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose
  .connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
