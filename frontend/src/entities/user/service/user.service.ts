import axiosApi from '../../../shared/api/axiosApi';
import type { ILogin, IRegister, IUser } from '../model/user.types';
import { toast } from 'react-toastify';

export const register = async (data: IRegister): Promise<IUser> => {
  const formData = new FormData();

  const keys = Object.keys(data) as (keyof IRegister)[];

  keys.forEach((key) => {
    const value = data[key];

    if (value) {
      formData.append(key, value);
    }
  });
  
  const response = await axiosApi.post<IUser>('/users', formData);
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
