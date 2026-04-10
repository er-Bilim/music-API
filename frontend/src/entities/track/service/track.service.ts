import axiosApi from '../../../shared/api/axiosApi';
import type { ITrack } from '../model/track.types';

export const getTracks = async (album_id: string): Promise<ITrack[]> => {
  const response = await axiosApi<ITrack[]>(`tracks?album=${album_id}`);
  const data = response.data;

  return data;
};

