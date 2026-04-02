import axiosApi from '../../../shared/api/axiosApi';
import type { IArtist } from '../model/artist.types';

export const getArtists = async (): Promise<IArtist[]> => {
  const response = await axiosApi<IArtist[]>('/artists');
  const data = response.data;
  return data;
};

export const getArtist = async (artist_id: string): Promise<IArtist> => {
  const response = await axiosApi<IArtist>(`/artists/${artist_id}`);
  const data = response.data;
  return data;
};
