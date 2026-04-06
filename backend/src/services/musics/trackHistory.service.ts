import type { HydratedDocument, Types } from 'mongoose';
import TrackHistory from '../../model/musics/TrackHistory.ts';
import type { ITrackHistory } from '../../types/music.types.ts';
import type { IUser } from '../../types/user.types.ts';

const TrackHistoryService = {
  getAll: async (user: HydratedDocument<IUser>) => {
    const history = await TrackHistory.find({ user: user._id }).populate(
      'track artist',
    ).sort({datetime: -1});
    return history;
  },

  create: async (data: ITrackHistory) => {
    const trackHistory = new TrackHistory(data);
    return await trackHistory.save();
  },
};

export default TrackHistoryService;
