import axiosApi from '../../../shared/api/axiosApi';
import type { IUser } from '../model/user.types';

export const register = async (data: IUser): Promise<IUser> => {
  const response = await axiosApi.post<IUser>('/users', data);
  const userData = response.data;
  return userData;
};
