import mongoose, { model, Schema } from 'mongoose';
import Album from './Album.ts';

const TrackSchema = new Schema({
  album_id: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (album_id: mongoose.Types.ObjectId) => {
        const album = await Album.findById(album_id);

        if (!album) {
          return false;
        }

        return true;
      },
      message: "Album doesn't exist :(",
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
  trackNumber: {
    type: Number,
    required: true,
    default: 1,
  },
  youtubeLink: {
    type: String,
    required: false,
  },
  isPublished: {
    type: Boolean,
    required: false,
    default: false,
  },
});

TrackSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    const { __v, ...track_history } = ret;
    return track_history;
  },
});

TrackSchema.pre('find', function () {
  this.sort({ trackNumber: 1 });
});



const Track = model('Track', TrackSchema);
export default Track;
