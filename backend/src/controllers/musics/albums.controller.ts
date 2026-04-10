import type { NextFunction, Request, Response } from 'express';
import AlbumsService from '../../services/musics/albums.service.ts';
import type { IAlbum } from '../../types/music.types.ts';
import deleteImage from '../../utils/deleteImage.ts';
import { Error, isValidObjectId } from 'mongoose';
import type { RequestOptionalUser } from '../../middlewares/optionalAuth.ts';

const AlbumsController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqUser = req as RequestOptionalUser;

      const role = reqUser.user?.role || 'guest';

      const albums = await AlbumsService.getAll(role);
      return res.json(albums);
    } catch (error) {
      next(error);
    }
  },

  getById: async (
    _req: Request,
    res: Response,
    next: NextFunction,
    album_id: string,
  ) => {
    try {
      const album = await AlbumsService.getById(album_id);

      if (!album) {
        return res.status(404).json({
          error: 'Album not found',
        });
      }

      return res.json(album);
    } catch (error) {
      if (!isValidObjectId(album_id)) {
        return res.status(400).json({
          error: 'Invalid album id',
        });
      }

      return next(error);
    }
  },

  getArtistAlbums: async (_req: Request, res: Response, artist_id: string) => {
    const artistAlbums = await AlbumsService.getArtistAlbums(artist_id);

    if (artistAlbums.length === 0) {
      return res.status(404).json({
        error: "Artist's albums not found",
      });
    }

    return res.json(artistAlbums);
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const body: IAlbum = req.body;

    const correctAlbumData: IAlbum = {
      artist_id: body.artist_id,
      name: body.name,
      image: req.file ? `images/${req.file.filename}` : null,
    };

    try {
      const album = await AlbumsService.create(correctAlbumData);
      return res.json(album);
    } catch (error) {
      await deleteImage(correctAlbumData);
      if (error instanceof Error.ValidationError) {
        res.status(400).json({
          error,
        });
      }

      next(error);
    }
  },

  togglePublished: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const album_id = req.params.id as string;

      const updatedAlbum = await AlbumsService.togglePublished(album_id);

      if (!updatedAlbum) {
        return res.status(404).json({
          error: 'Album not found',
        });
      }

      return res.json(updatedAlbum);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const album_id = req.params.id as string;

      const album = await AlbumsService.delete(album_id);

      if (!album) {
        return res.status(404).json({
          error: 'Album not found',
        });
      }

      await deleteImage({ image: album.image });

      return res.json({
        message: 'Album deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AlbumsController;
