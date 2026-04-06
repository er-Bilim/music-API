import axiosApi from '../../../shared/api/axiosApi';
import type { ILogin, IRegister, IUser } from '../model/user.types';
import { toast } from 'react-toastify';

export const register = async (data: IRegister): Promise<IUser> => {
  const response = await axiosApi.post<IUser>('/users', data);
  const userData = response.data;
  toast.success(userData.message);
  return userData;
};

export const login = async (data: ILogin): Promise<IUser> => {
  const response = await axiosApi.post<IUser>('/users/sessions', data);
  const userData = response.data;
  toast.success(userData.message);
  return userData;
};

export const logout = async (user: IUser): Promise<void> => {
  const token = user.user.token;
  const response = await axiosApi.delete('/users/sessions', {
    headers: { Authorization: token },
  });
  toast.success(response.data.message);
};
