import { auth } from '@/service/firebase';
import axios from 'axios';

const createAxios = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    async (config) => {
      if (!auth.currentUser) return config;

      try {
        const userToken = await auth.currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${userToken}`;
        return config;
      } catch (e) {
        console.error(e);
        return config;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxios;
