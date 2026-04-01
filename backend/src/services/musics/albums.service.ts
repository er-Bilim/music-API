import mongoose from 'mongoose';
import Album from '../../model/musics/Album.ts';
import type { IAlbum } from '../../types/music.types.ts';

const AlbumsService = {
  getAll: async () => {
    const albums = await Album.find();
    return albums;
  },

  getById: async (album_id: string) => {
    const album = await Album.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(album_id),
        },
      },
      {
        $lookup: {
          from: 'artists',
          localField: 'artist_id',
          foreignField: '_id',
          as: 'artist',
        },
      },
      {
        $project: {
          artist_id: 0,
          __v: 0,
        },
      },
    ]);
    return album[0];
  },

  getArtistAlbums: async (artist_id: string) => {
    const artistsAlbums = await Album.aggregate([
      {
        $match: {
          artist_id: new mongoose.Types.ObjectId(artist_id),
        },
      },
      {
        $lookup: {
          from: 'tracks',
          localField: '_id',
          foreignField: 'album_id',
          as: 'tracks',
        },
      },

      {
        $addFields: {
          trackCount: {
            $size: '$tracks',
          },
        },
      },
      {
        $project: {
          tracks: 0,
          __v: 0,
        },
      },
      {
        $sort: {
          release_year: -1,
        },
      },
    ]);

    return artistsAlbums;
  },

  create: async (data: IAlbum) => {
    const album = new Album(data);
    return await album.save();
  },
};

export default AlbumsService;
