import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import apiRoute from './routes/api.route.ts';
import mongoose from 'mongoose';
import { PORT } from './constants/constants.ts';
import dotenv from 'dotenv';
import config from './config.ts';

const app: Express = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
dotenv.config();
app.use('/api', apiRoute);

app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((error) => console.error(error));
