import mongoose from 'mongoose';
import Album from '../../model/musics/Album.ts';
import type { IAlbum } from '../../types/music.types.ts';
import togglePublishedHelper from '../helpers/togglePublished.ts';

const AlbumsService = {
  getAll: async (role: string) => {
    const albums = await Album.find(
      role === 'admin' ? {} : { isPublished: true },
    );
    return albums;
  },

  getById: async (id: string, role: string) => {
    const album = await Album.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          ...(role === 'admin' ? {} : { isPublished: true }),
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

  getArtistAlbums: async (artist_id: string, role: string) => {
    const artistsAlbums = await Album.aggregate([
      {
        $match: {
          artist_id: new mongoose.Types.ObjectId(artist_id),
          ...(role === 'admin' ? {} : { isPublished: true }),
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

  togglePublished: async (id: string) => {
    const updatedAlbum = await togglePublishedHelper(Album, id);
    return updatedAlbum;
  },

  delete: async (id: string) => {
    const album = await Album.findOneAndDelete({ _id: id });
    return album;
  },
};

export default AlbumsService;
