import { model, Schema } from 'mongoose';
import Album from './Album.js';

const TrackSchema = new Schema({
  album_id: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: (album_id: string) => {
        const album = Album.findById(album_id);

        if (!album) {
          return false;
        }

        return true;
      },
    },
  },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Track = model('Track', TrackSchema);
export default Track;
