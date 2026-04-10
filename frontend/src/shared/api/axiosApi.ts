import axios from 'axios';
import { API_URL } from '../constants/constants';

const axiosApi = axios.create({
  baseURL: `${API_URL}api`,
});

axiosApi.defaults.withCredentials = true;

export default axiosApi;
