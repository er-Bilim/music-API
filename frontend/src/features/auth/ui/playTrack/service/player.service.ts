import { toast } from 'react-toastify';
import type { ITrackHistoryMutation } from '../../../../../entities/trackHistory/model/trackHistory.types';
import axiosApi from '../../../../../shared/api/axiosApi';

export const servicePlayTrack = async (token: string, data: ITrackHistoryMutation) => {
  const response = await axiosApi.post('/track_history', data, {
    headers: { Authorization: token },
  });
  return toast.success(response.data.message);
};
