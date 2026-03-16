import multer from 'multer';
import path from 'path';
import config from '../config.js';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

const imageStorage = multer.diskStorage({
  destination: async (_req, __file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, destDir);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, randomUUID() + extension);
  },
});

export const imagesUpload = multer({ storage: imageStorage });