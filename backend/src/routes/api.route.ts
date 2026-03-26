import { Router } from 'express';
import artistsRouter from './musics/artists.route.ts';
import albumsRouter from './musics/albums.route.ts';
import tracksRouter from './musics/tracks.route.ts';
import usersRouter from './user/users.route.ts';
import trackHistoryRouter from './musics/trackHistory.route.ts';

const apiRoute = Router();

apiRoute.use('/artists', artistsRouter);
apiRoute.use('/albums', albumsRouter);
apiRoute.use('/tracks', tracksRouter);
apiRoute.use('/track_history', trackHistoryRouter);
apiRoute.use('/users', usersRouter);

export default apiRoute;
