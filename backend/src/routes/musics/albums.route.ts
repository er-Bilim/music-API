import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { imagesUpload } from '../../middlewares/multer.ts';
import AlbumsController from '../../controllers/musics/albums.controller.ts';
import auth from '../../middlewares/auth.ts';
import permit from '../../middlewares/permit.ts';
import optionalAuth from '../../middlewares/optionalAuth.ts';

const albumsRouter = Router();

albumsRouter.get(
  '/',
  optionalAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const artist_id = req.query.artist as string;

    if (artist_id) {
      return await AlbumsController.getArtistAlbums(req, res, artist_id);
    }
    return await AlbumsController.getAll(req, res, next);
  },
);

albumsRouter.get(
  '/:album_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const album_id = req.params.album_id as string;

    if (album_id) {
      return await AlbumsController.getById(req, res, next, album_id);
    }
  },
);

albumsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  AlbumsController.create,
);

albumsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  AlbumsController.togglePublished,
);

albumsRouter.delete('/:id', auth, permit('admin'), AlbumsController.delete);

export default albumsRouter;
