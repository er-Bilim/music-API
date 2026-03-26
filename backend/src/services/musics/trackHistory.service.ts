import TrackHistory from '../../model/musics/TrackHistory.js';
import User from '../../model/user/User.js';
import type { ITrackHistory } from '../../types/music.types.js';

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
