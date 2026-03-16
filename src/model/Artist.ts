import { model, Schema } from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
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
