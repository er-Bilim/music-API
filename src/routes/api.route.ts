import { Router } from 'express';
import artistsRouter from './artists.route.js';
import albumsRouter from './albums.route.js';
import tracksRouter from './tracks.route.js';

const apiRoute = Router();

apiRoute.use('/artists', artistsRouter);
apiRoute.use('/albums', albumsRouter);
apiRoute.use('/tracks', tracksRouter);

export default apiRoute;
