import type { NextFunction, Request, Response } from 'express';
import type { ITrackHistory } from '../../types/music.types.ts';
import TrackHistoryService from '../../services/musics/trackHistory.service.ts';
import { Error } from 'mongoose';
import type { RequestWithUser } from '../../middlewares/auth.ts';

const TrackHistoryController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const reqUser = req as RequestWithUser;

    try {
      const user = reqUser.user;

      const history = await TrackHistoryService.getAll(user);

      if (history.length === 0) {
        return res.status(404).json({
          error: 'no tracks',
        });
      }

      return res.json(history);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const body: ITrackHistory = req.body;
    const reqUser = req as RequestWithUser;

    try {
      const user = reqUser.user;
      const correctData = {
        user: user.id,
        track: body.track,
        artist: body.artist,
      };
      const trackHistory = await TrackHistoryService.create(correctData);

      return res.json({ message: 'listen listen', trackHistory });
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
