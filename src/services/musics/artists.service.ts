import Artist from '../../model/Artist.js';
import type { IArtist } from '../../types/music.types.js';

class ArtistsService {
  static getAll = async () => {
    const artists = await Artist.find().select('-__v');
    return artists;
  };

  static create = async (data: IArtist) => {
    const artist = new Artist(data);
    return await artist.save();
  };
}

export default ArtistsService;
