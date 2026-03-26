import { model, Schema } from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    validate: {
      validator: async (name: string) => {
        const artist = await Artist.findOne({ name });
        if (artist) {
          return false;
        }

        return true;
      },
      message: 'Artist already exists',
    },
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
  information: {
    type: String,
    required: false,
    default: null,
  },
});

const Artist = model('Artist', ArtistSchema);

export default Artist;
