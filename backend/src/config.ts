import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const rootPath = path.dirname(__filename);

const config = {
  rootPath,
  publicPath: path.join(rootPath, '../public'),
  db: 'mongodb://localhost/musics-bilim',
  jwtSecret: process.env.JWT_SECRET ?? 'secret',
  clientID: process.env.GOOGLE_CLIENT_ID ?? 'google client',
  clientSecretID: process.env.GOOGLE_CLIENT_SECRET ?? 'google secret',
};

export default config;
