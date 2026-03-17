import type { NextFunction, Request, Response } from 'express';
import AlbumsService from '../services/albums.service.js';
import type { IAlbum } from '../types/music.types.js';
import deleteImage from '../utils/deleteImage.js';
import { Error, isValidObjectId } from 'mongoose';

class AlbumsController {
  static getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const albums = await AlbumsService.getAll();
      return res.json(albums);
    } catch (error) {
      next(error);
    }
  };

  static getById = async (
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
  };

  static getArtistAlbums = async (
    _req: Request,
    res: Response,
    artist_id: string,
  ) => {
    const artistAlbums = await AlbumsService.getArtistAlbums(artist_id);

    if (artistAlbums.length === 0) {
      return res.status(404).json({
        error: "Artist's albums not found",
      });
    }

    return res.json(artistAlbums);
  };

  static create = async (req: Request, res: Response, next: NextFunction) => {
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
      await deleteImage(correctAlbumData, req);
      if (error instanceof Error.ValidationError) {
        res.status(400).json({
          error,
        });
      }

      next(error);
    }
  };
}

export default AlbumsController;
