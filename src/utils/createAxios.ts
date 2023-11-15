import axios from 'axios';

interface CreateAxiosProps {
  data?: any;
  params?: any;
}

const createAxios = () => {
  return axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
  });
};

export default createAxios;