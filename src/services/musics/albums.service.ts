import Album from '../../model/Album.js';
import type { IAlbum } from '../../types/music.types.js';

class AlbumsService {
  static getAll = async () => {
    const albums = await Album.find().select('-__v');
    return albums;
  };

  static getById = async (album_id: string) => {
    const album = await Album.findById(album_id).populate('artist_id');
    return album;
  };

  static getArtistAlbums = async (artist_id: string) => {
    const artistsAlbums = await Album.find({ artist_id: artist_id }).select(
      '-__v',
    );
    return artistsAlbums;
  };

  static create = async (data: IAlbum) => {
    const album = new Album(data);
    return await album.save();
  };
}

export default AlbumsService;
