import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import apiRoute from './routes/api.route.js';
import mongoose from 'mongoose';
import { PORT } from './constants/constants.js';

const app: Express = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api', apiRoute);

app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

const run = async () => {
  await mongoose.connect('mongodb://localhost/musics-bilim');

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((error) => console.error(error));
