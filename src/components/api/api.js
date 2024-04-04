import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Target URL

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
