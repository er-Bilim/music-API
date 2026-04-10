import axiosApi from '../../../shared/api/axiosApi';
import type { ITrackHistory } from '../model/trackHistory.types';

export const serviceGetTrackHistory = async () => {
  const response = await axiosApi<ITrackHistory[]>('/track_history');
  const history = response.data;
  return history;
};
