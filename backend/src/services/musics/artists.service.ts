import Artist from '../../model/musics/Artist.ts';
import type { IArtist } from '../../types/music.types.ts';

const ArtistsService = {
  getAll: async () => {
    const artists = await Artist.find().select('-__v');
    return artists;
  },

  create: async (data: IArtist) => {
    const artist = new Artist(data);
    return await artist.save();
  },
};

export default ArtistsService;
