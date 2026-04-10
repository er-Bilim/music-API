import type { NextFunction, Request, Response } from 'express';
import ArtistsService from '../../services/musics/artists.service.ts';
import type { IArtist } from '../../types/music.types.ts';
import { Error } from 'mongoose';
import deleteImage from '../../utils/deleteImage.ts';
import type { RequestOptionalUser } from '../../middlewares/optionalAuth.ts';

const ArtistController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userReq = req as RequestOptionalUser;
      const role = userReq.user?.role || 'guest';

      const artists = await ArtistsService.getAll(role);
      return res.json(artists);
    } catch (error) {
      return next(error);
    }
  },

  getArtist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artist_id = req.params.id as string;

      const artist = await ArtistsService.getArtist(artist_id);

      if (!artist) {
        return res.status(404).json({
          error: 'Artist not found',
        });
      }

      return res.json(artist);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error,
        });
      }
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
      return res.json({
        message: 'The artist has been successfully created',
        artistData,
      });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).json({
          error,
        });
      }

      return next(error);
    }
  },

  togglePublished: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artist_id = req.params.id as string;

      const updatedArtist = await ArtistsService.togglePublished(artist_id);

      if (!updatedArtist) {
        return res.status(404).json({
          error: 'Artist not found',
        });
      }

      return res.json(updatedArtist);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artist_id = req.params.id as string;

      const artist = await ArtistsService.delete(artist_id);

      if (!artist) {
        return res.status(404).json({
          error: 'Artist not found',
        });
      }

      await deleteImage({ image: artist.image });

      return res.json({
        message: 'Artist deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ArtistController;
