import fs from 'fs/promises';
import path from 'path';
import config from '../config.ts';

const deleteImage = async (
  item: { image: string | null | undefined },
): Promise<void> => {
  if (item.image) {
    try {
      await fs.unlink(path.join(config.publicPath, item.image));
    } catch (error) {
      console.error(error);
    }
  }
};

export default deleteImage;
