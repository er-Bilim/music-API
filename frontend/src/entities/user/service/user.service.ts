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

export const loginGoogleService = async (credential: string) => {
  const response = await axiosApi.post('/users/google', { credential });
  const data = response.data;
  return data;
};

export const logout = async (): Promise<void> => {
  const response = await axiosApi.delete('/users/sessions');
  toast.success(response.data.message);
};
