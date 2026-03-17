import fs from 'fs/promises';
import path from 'path';
import config from '../config.js';
import type { Request } from 'express';

const deleteImage = async (item: { image: string | null }, req: Request) => {
  if (req.file && item.image) {
    try {
      await fs.unlink(path.join(config.publicPath, item.image));
    } catch (error) {
      console.error(error);
    }
  }
};

export default deleteImage;
