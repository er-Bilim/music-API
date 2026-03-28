import { Router } from 'express';
import TrackHistoryController from '../../controllers/musics/trackHistory.controller.ts';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', TrackHistoryController.create);

export default trackHistoryRouter;
