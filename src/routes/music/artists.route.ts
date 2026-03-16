import { Router, type Request, type Response } from 'express';
import { imagesUpload } from '../../middlewares/multer.js';
import type { IArtist } from '../../types/music.types.js';
import Artist from '../../model/Artist.js';
import { Error } from 'mongoose';

const artistsRouter = Router();

artistsRouter.get('/', async (req: Request, res: Response, next) => {
  try {
    const artists = await Artist.find().select('-__v');
    return res.json(artists);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.post(
  '/',
  imagesUpload.single('image'),
  async (req: Request, res: Response, next) => {
    const body: IArtist = req.body;

    const correctArtistData: IArtist = {
      name: body.name,
      information: body.information,
      image: req.file ? `images/${req.file.filename}` : null,
    };

    try {
      const artistData = new Artist(correctArtistData);
      await artistData.save();

      return res.json(artistData);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).json({
          error,
        });
      }

      next(error);
    }
  },
);

export default artistsRouter;
