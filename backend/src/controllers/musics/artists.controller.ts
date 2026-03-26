import type { NextFunction, Request, Response } from 'express';
import ArtistsService from '../../services/musics/artists.service.ts';
import type { IArtist } from '../../types/music.types.ts';
import { Error } from 'mongoose';

const ArtistController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const artists = await ArtistsService.getAll();
      return res.json(artists);
    } catch (error) {
      return next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const body: IArtist = req.body;

    const correctArtistData: IArtist = {
      name: body.name,
      information: body.information,
      image: req.file ? `images/${req.file.filename}` : null,
    };

    try {
      const artistData = await ArtistsService.create(correctArtistData);
      return res.json(artistData);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).json({
          error,
        });
      }

      return next(error);
    }
  },
};

export default ArtistController;
