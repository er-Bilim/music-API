import { Router } from 'express';
import TrackHistoryController from '../../controllers/musics/trackHistory.controller.ts';
import auth from '../../middlewares/auth.ts';

const trackHistoryRouter = Router();

trackHistoryRouter.get('/', auth, TrackHistoryController.getAll)
trackHistoryRouter.post('/', auth ,TrackHistoryController.create);

export default trackHistoryRouter;
