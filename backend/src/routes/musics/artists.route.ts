import { Router } from 'express';
import { imagesUpload } from '../../middlewares/multer.ts';
import ArtistController from '../../controllers/musics/artists.controller.ts';
import auth from '../../middlewares/auth.ts';
import permit from '../../middlewares/permit.ts';
import optionalAuth from '../../middlewares/optionalAuth.ts';

const artistsRouter = Router();

artistsRouter.get('/', optionalAuth, ArtistController.getAll);

artistsRouter.get('/:id', optionalAuth, ArtistController.getArtist);

artistsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  ArtistController.create,
);

artistsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  ArtistController.togglePublished,
);

artistsRouter.delete('/:id', auth, permit('admin'), ArtistController.delete);

export default artistsRouter;
