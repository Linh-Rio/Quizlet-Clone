import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:8080',
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};
export const post = async (path, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response.data;
};

httpRequest.interceptors.response.use((response) => {
  const { data } = response;
  return data;
});

export default httpRequest;
