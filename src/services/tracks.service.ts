import Album from '../model/Album.js';
import Track from '../model/Track.js';
import type { ITrack } from '../types/music.types.js';

class TracksService {
  static getAll = async () => {
    const tracks = await Track.find().select('-__v');
    return tracks;
  };

  static getAlbumTracks = async (album_id: string) => {
    const albumTracks = await Track.find({ album_id }).select('-__v');
    return albumTracks;
  };

  static getArtistTracks = async (artist_id: string) => {
    const artistTracks = await Album.find({ artist_id });

    if (artistTracks) {
      const album = artistTracks.at(0);
      if (album) {
        const albumId: string = album.id;
        const artistTracks = await Track.find({ album_id: albumId });
        return artistTracks;
      }

      return null;
    }
    return null;
  };

  static create = async (data: ITrack) => {
    const track = new Track(data);
    return await track.save();
  };
}

export default TracksService;
