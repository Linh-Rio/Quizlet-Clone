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

httpRequest.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    const profile = JSON.parse(localStorage.getItem('profile'));
    req.headers.Authorization = `Bearer ${profile.token}`;
  }
  return req;
});

export default httpRequest;
