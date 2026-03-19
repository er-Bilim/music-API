import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { imagesUpload } from '../../middlewares/multer.js';
import ArtistController from '../../controllers/musics/artists.controller.js';

const artistsRouter = Router();

artistsRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    return await ArtistController.getAll(req, res, next);
  },
);

artistsRouter.post(
  '/',
  imagesUpload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    return await ArtistController.create(req, res, next);
  },
);

export default artistsRouter;
