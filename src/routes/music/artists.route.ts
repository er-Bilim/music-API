import { Router, type Request, type Response } from 'express';

const artistsRouter = Router();

artistsRouter.get('/', async (req: Request, res: Response) => {
  return res.json({
    artist: 'Artist',
  });
});

export default artistsRouter;
