import axiosApi from '../../../shared/api/axiosApi';

export const getTracks = async (album_id: string) => {
  const response = await axiosApi(`tracks?album=${album_id}`);
  const data = response.data;

  return data;
};
