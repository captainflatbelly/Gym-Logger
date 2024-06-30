// src/utils/axiosInstance.js
import axios from 'axios';
import { deleteCookie } from './cookieUtils'; // Utility function to delete cookies

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post('/auth/verify-token', {}, { withCredentials: true });
        return axiosInstance(originalRequest);
      } catch (err) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
