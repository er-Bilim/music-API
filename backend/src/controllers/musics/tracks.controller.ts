import type { NextFunction, Request, Response } from 'express';
import TracksService from '../../services/musics/tracks.service.ts';
import type { ITrack } from '../../types/music.types.ts';
import { Error, isValidObjectId } from 'mongoose';

const TrackController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tracks = await TracksService.getAll();
      res.json(tracks);
    } catch (error) {
      next(error);
    }
  },

  getAlbumTracks: async (_req: Request, res: Response, album_id: string) => {
    const albumTracks = await TracksService.getAlbumTracks(album_id);

    if (albumTracks.length === 0) {
      return res.status(404).json({
        error: "Album doesn't have tracks",
      });
    }

    return res.json(albumTracks);
  },

  getArtistTracks: async (
    _req: Request,
    res: Response,
    next: NextFunction,
    artist_id: string,
  ) => {
    try {
      const artistTracks = await TracksService.getArtistTracks(artist_id);

      if (!artistTracks) {
        return res.status(404).json({
          error: "Artist doesn't have tracks",
        });
      }

      return res.json(artistTracks);
    } catch (error) {
      if (!isValidObjectId(artist_id)) {
        return res.status(400).json({
          error: 'Invalid artist id',
        });
      }
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const body: ITrack = req.body;

    const correctTrackData: ITrack = {
      album_id: body.album_id,
      name: body.name,
      time: body.time,
    };

    if (!isValidObjectId(correctTrackData.album_id)) {
      return res.status(404).json({
        error: "Album doesn't exist",
      });
    }

    try {
      const track = await TracksService.create(correctTrackData);

      return res.json(track);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).json({
          error,
        });
      }
      next(error);
    }
  },
};

export default TrackController;
