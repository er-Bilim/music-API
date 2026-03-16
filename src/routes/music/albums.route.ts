import { Router, type Request, type Response } from 'express';

const albumsRouter = Router();

albumsRouter.get('/', async (req: Request, res: Response) => {
  return res.json({
    album: 'Album',
  });
});

export default albumsRouter;
