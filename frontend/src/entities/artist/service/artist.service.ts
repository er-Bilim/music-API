import axiosApi from '../../../shared/api/axiosApi';
import type {
  IArtist,
  IArtistCreated,
  IArtistMutation,
} from '../model/artist.types';

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

export const createArtistService = async (data: IArtistMutation) => {
  const formData = new FormData();

  const keys = Object.keys(data) as (keyof IArtistMutation)[];

  keys.forEach((key) => {
    const value = data[key];

    if (value) {
      formData.append(key, value);
    }
  });

  const response = await axiosApi.post<IArtistCreated>('/artists', formData);
  const createdArtist: IArtistCreated = response.data;
  return createdArtist;
};
