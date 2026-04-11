import axiosApi from '../../../shared/api/axiosApi';
import type { ICreatedTrack, ITrack, ITrackMutation } from '../model/track.types';

export const getTracks = async (album_id: string): Promise<ITrack[]> => {
  const response = await axiosApi<ITrack[]>(`tracks?album=${album_id}`);
  const data = response.data;

  return data;
};

export const createTrackService = async (data: ITrackMutation) => {
  const response = await axiosApi.post<ICreatedTrack>('tracks', data);
  const trackData = response.data;
  return trackData;
};
