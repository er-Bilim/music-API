import axiosApi from '../../../shared/api/axiosApi';
import type {
  IAlbum,
  IAlbumCreated,
  IAlbumMutation,
} from '../model/album.types';

export const getAlbums = async (artist_id: string): Promise<IAlbum[]> => {
  const response = await axiosApi<IAlbum[]>(`/albums?artist=${artist_id}`);
  const data = response.data;

  return data;
};

export const getAlbum = async (album_id: string): Promise<IAlbum> => {
  const response = await axiosApi<IAlbum>(`/albums/${album_id}`);
  const data = response.data;

  return data;
};

export const createAlbumService = async (data: IAlbumMutation) => {
  const newData = {
    ...data,
    release_year: String(data.release_year),
  };
  const formData = new FormData();

  const keys = Object.keys(data) as (keyof IAlbumMutation)[];

  keys.forEach((key) => {
    const value = newData[key];

    if (value) {
      formData.append(key, value);
    }
  });

  const response = await axiosApi.post<IAlbumCreated>('/albums', formData);
  const createdAlbum: IAlbumCreated = response.data;
  return createdAlbum;
};
