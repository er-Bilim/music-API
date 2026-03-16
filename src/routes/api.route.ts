import { Router } from 'express';
import artistsRouter from './music/artists.route.js';
import albumsRouter from './music/albums.route.js';
import tracksRouter from './music/tracks.route.js';

const apiRoute = Router();

apiRoute.use('/artists', artistsRouter);
apiRoute.use('/albums', albumsRouter);
apiRoute.use('/tracks', tracksRouter);

export default apiRoute;
