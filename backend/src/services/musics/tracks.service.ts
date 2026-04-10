import Album from '../../model/musics/Album.ts';
import Track from '../../model/musics/Track.ts';
import type { ITrack } from '../../types/music.types.ts';
import togglePublishedHelper from '../helpers/togglePublished.ts';

const TracksService = {
  getAll: async (role: string) => {
    const tracks = await Track.find(
      role === 'admin' ? {} : { isPublished: true },
    ).select('-__v');
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
    const lastTrack = await Track.findOne({ album_id: data.album_id }).sort({
      trackNumber: -1,
    });

    track.trackNumber = lastTrack ? lastTrack.trackNumber + 1 : 1;

    return await track.save();
  },

  togglePublished: async (id: string) => {
    const updatedTrack = await togglePublishedHelper(Track, id);
    return updatedTrack;
  },

  delete: async (id: string) => {
    const track = await Track.findOneAndDelete({ _id: id });
    return track;
  },
};

export default TracksService;
