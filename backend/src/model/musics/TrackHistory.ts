import { model, Schema } from 'mongoose';
import Track from './Track.ts';

const TrackHistorySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  track_id: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (track_id: string) => {
        const track = await Track.findById(track_id);

        if (!track) {
          return false;
        }

        return true;
      },
      message: 'Track does not exist',
    },
  },

  datetime: {
    type: Date,
    default: Date.now,
  },
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);
export default TrackHistory;
