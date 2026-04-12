import mongoose, { model, Schema } from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    max: 55,
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
    max: 500,
    required: false,
    default: null,
  },
  isPublished: {
    type: Boolean,
    required: false,
    default: false,
  },
});

ArtistSchema.pre('findOneAndDelete', async function () {
  const artistID = await this.model.findOne(this.getQuery());

  try {
    const albums = await mongoose.model('Album').find({ artist_id: artistID });

    if (albums.length > 0) {
      const albumsID: string[] = albums.map((album) => album.id);
      await mongoose.model('Track').deleteMany({ album_id: { $in: albumsID } });
    }

    if (artistID) {
      await mongoose.model('Album').deleteMany({ artist_id: artistID });
      await mongoose.model('Track_history').deleteMany({ artist: artistID });
    }
  } catch (error) {
    console.error(error);
  }
});

const Artist = model('Artist', ArtistSchema);

export default Artist;
