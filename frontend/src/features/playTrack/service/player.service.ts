import { toast } from 'react-toastify';
import type { ITrackHistoryMutation } from '../../../entities/trackHistory/model/trackHistory.types';
import axiosApi from '../../../shared/api/axiosApi';

export const servicePlayTrack = async (data: ITrackHistoryMutation) => {
  const response = await axiosApi.post('/track_history', data);
  return toast.success(response.data.message);
};
