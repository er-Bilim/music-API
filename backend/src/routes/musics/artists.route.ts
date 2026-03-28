import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { imagesUpload } from '../../middlewares/multer.ts';
import ArtistController from '../../controllers/musics/artists.controller.ts';

const artistsRouter = Router();

artistsRouter.get('/', ArtistController.getAll);

artistsRouter.post('/', imagesUpload.single('image'), ArtistController.create);

export default artistsRouter;
