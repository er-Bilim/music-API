import axiosApi from '../../../shared/api/axiosApi';
import type { IArtist } from '../model/artist.types';

export const getArtists = async (): Promise<IArtist[]> => {
  const response = await axiosApi('/artists');
  const data = response.data;
  return data;
};
