import axiosApi from '../../../shared/api/axiosApi';
import type { ITrackHistory } from '../model/trackHistory.types';

export const serviceGetTrackHistory = async (token: string) => {
  const response = await axiosApi<ITrackHistory[]>('/track_history', {
    headers: { Authorization: token },
  });
  const history = response.data;
  return history;
};
