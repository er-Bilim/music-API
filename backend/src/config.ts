import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const rootPath = path.dirname(__filename);

const config = {
  rootPath,
  publicPath: path.join(rootPath, '../public'),
  db: 'mongodb://localhost/musics-bilim',
};

export default config;
