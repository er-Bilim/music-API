import { Router } from 'express';
import artistsRouter from './musics/artists.route.js';
import albumsRouter from './musics/albums.route.js';
import tracksRouter from './musics/tracks.route.js';
import usersRouter from './user/users.route.js';
import trackHistoryRouter from './musics/trackHistory.route.js';

const apiRoute = Router();

apiRoute.use('/artists', artistsRouter);
apiRoute.use('/albums', albumsRouter);
apiRoute.use('/tracks', tracksRouter);
apiRoute.use('/track_history', trackHistoryRouter);
apiRoute.use('/users', usersRouter);

export default apiRoute;
