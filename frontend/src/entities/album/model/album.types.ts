import type { IArtist } from '../../artist/model/artist.types';

export interface IAlbum {
  _id: string;
  artist: IArtist[];
  name: string;
  release_year: number;
  image: string;
  trackCount: number;
  isPublished: boolean;
}

export interface IAlbumMutation {
  name: string;
  release_year: number;
  image?: File | null;
}

export interface IAlbumCreated {
  message: string;
  album: IAlbum;
}
