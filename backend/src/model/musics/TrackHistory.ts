import { model, Schema } from 'mongoose';
import Track from './Track.ts';
import Artist from './Artist.ts';

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  track: {
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
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (artist_id: string) => {
        const artist = await Artist.findById(artist_id);

        if (!artist) {
          return false;
        }

        return true;
      },
      message: 'Artist does not exist',
    },
  },

  datetime: {
    type: Date,
    default: Date.now,
  },
});

const TrackHistory = model('Track_history', TrackHistorySchema);
export default TrackHistory;
