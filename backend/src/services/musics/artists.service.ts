import Artist from '../../model/musics/Artist.ts';
import type { IArtist } from '../../types/music.types.ts';

const ArtistsService = {
  getAll: async () => {
    const artists = await Artist.find().select('-__v');
    return artists;
  },

  getArtist: async (id: string) => {
    const artist = await Artist.findById(id);
    return artist;
  },

  create: async (data: IArtist) => {
    const artist = new Artist(data);
    return await artist.save();
  },

  delete: async (id: string) => {
    const artist = await Artist.findOneAndDelete({ _id: id });
    return artist;
  },
};

export default ArtistsService;
