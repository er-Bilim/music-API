import { Router, type Request, type Response } from 'express';

const tracksRouter = Router();

tracksRouter.get('/', async (req: Request, res: Response) => {
  return res.json({
    tracks: 'Tracks',
  });
});

export default tracksRouter;
