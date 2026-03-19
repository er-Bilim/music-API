import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import TrackHistoryController from '../../controllers/musics/trackHistory.controller.js';

const trackHistoryRouter = Router();

trackHistoryRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    await TrackHistoryController.create(req, res, next);
  },
);

export default trackHistoryRouter;
