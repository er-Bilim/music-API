import type { NextFunction, Request, Response } from 'express';
import type { ITrackHistory } from '../../types/music.types.ts';
import TrackHistoryService from '../../services/musics/trackHistory.service.ts';
import { Error } from 'mongoose';

const TrackHistoryController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const body: ITrackHistory = req.body;
    try {
      const token = req.get('Authorization');

      if (token) {
        const trackHistory = await TrackHistoryService.create(token, body);
        if (trackHistory) {
          return res.json(trackHistory);
        }
      }

      return res.status(401).json({
        error: 'Unauthorized',
      });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).json({
          error,
        });
      }
      next(error);
    }
  },
};

export default TrackHistoryController;
