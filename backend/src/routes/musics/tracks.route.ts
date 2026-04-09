import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import TrackController from '../../controllers/musics/tracks.controller.ts';
import auth from '../../middlewares/auth.ts';
import permit from '../../middlewares/permit.ts';

const tracksRouter = Router();

tracksRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const album_id = req.query.album as string;
    const artist_id = req.query.artist as string;

    if (album_id) {
      return await TrackController.getAlbumTracks(req, res, album_id);
    }

    if (artist_id) {
      return await TrackController.getArtistTracks(req, res, next, artist_id);
    }

    return await TrackController.getAll(req, res, next);
  },
);

tracksRouter.post('/', auth, TrackController.create);

tracksRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  TrackController.togglePublished,
);

tracksRouter.delete('/:id', auth, permit('admin'), TrackController.delete);

export default tracksRouter;
