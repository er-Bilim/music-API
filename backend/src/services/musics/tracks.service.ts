import Album from '../../model/musics/Album.ts';
import Track from '../../model/musics/Track.ts';
import type { ITrack } from '../../types/music.types.ts';

const TracksService = {
  getAll: async () => {
    const tracks = await Track.find().select('-__v');
    return tracks;
  },

  getAlbumTracks: async (album_id: string) => {
    const albumTracks = await Track.find({ album_id }).select('-__v');
    return albumTracks;
  },

  getArtistTracks: async (artist_id: string) => {
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
  },

  create: async (data: ITrack) => {
    const track = new Track(data);
    return await track.save();
  },
};

export default TracksService;
