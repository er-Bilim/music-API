import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default axiosApi;
