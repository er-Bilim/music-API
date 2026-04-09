import Artist from '../../model/musics/Artist.ts';
import type { IArtist } from '../../types/music.types.ts';
import togglePublishedHelper from '../helpers/togglePublished.ts';

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

  togglePublished: async (id: string) => {
    const updatedArtist = await togglePublishedHelper(Artist, id);
    return updatedArtist;
  },

  delete: async (id: string) => {
    const artist = await Artist.findOneAndDelete({ _id: id });
    return artist;
  },
};

export default ArtistsService;
