import axiosApi from '../../../shared/api/axiosApi';
import type { IAlbum } from '../model/album.types';

export const getAlbums = async (artist_id: string): Promise<IAlbum[]> => {
  const response = await axiosApi(`/albums?artist=${artist_id}`);
  const data = response.data;

  return data;
};

export const getAlbum = async (album_id: string): Promise<IAlbum> => {
  const response = await axiosApi(`/albums/${album_id}`);
  const data = response.data;
  
  return data;
};
