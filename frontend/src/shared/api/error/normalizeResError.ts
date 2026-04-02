import { isAxiosError } from 'axios';

export const parseApiError = <T>(error: T): T => {
  if (isAxiosError(error) && error.response) {
    return error.response.data;
  }

  return error;
};
