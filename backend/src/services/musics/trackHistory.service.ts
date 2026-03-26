import TrackHistory from '../../model/musics/TrackHistory.ts';
import User from '../../model/user/User.ts';
import type { ITrackHistory } from '../../types/music.types.ts';

class TrackHistoryService {
  static create = async (token: string, data: ITrackHistory) => {
    const user = await User.findOne({ token });

    if (user) {
      const trackHistory = new TrackHistory({
        track_id: data.track_id,
        user_id: user.id,
      });
      return await trackHistory.save();
    }

    return null;
  };
}

export default TrackHistoryService;
