import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import TrackController from '../controllers/tracks.controller.js';

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

tracksRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    return await TrackController.create(req, res, next);
  },
);

export default tracksRouter;
