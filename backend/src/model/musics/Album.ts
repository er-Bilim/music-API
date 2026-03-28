import { isValidObjectId, model, Schema } from 'mongoose';
import Artist from './Artist.ts';

const AlbumSchema = new Schema({
  artist_id: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: (artist_id: string) => {
        const artist = Artist.findById(artist_id);
        if (!artist && !isValidObjectId(artist_id)) {
          return false;
        }

        return true;
      },
      message: 'Artist does not exist',
    },
  },
  name: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
});

const Album = model('Album', AlbumSchema);

export default Album;
