import { Router } from 'express';
import { imagesUpload } from '../../middlewares/multer.ts';
import ArtistController from '../../controllers/musics/artists.controller.ts';
import auth from '../../middlewares/auth.ts';

const artistsRouter = Router();

artistsRouter.get('/', ArtistController.getAll);

artistsRouter.get('/:id', ArtistController.getArtist);

artistsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  ArtistController.create,
);

export default artistsRouter;
