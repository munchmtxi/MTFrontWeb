import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api/v1/geolocation' });

// Use token from authApi.js
const getToken = () => localStorage.getItem('token');
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getCurrentLocation = () =>
  api.get('/current').then((res) => res.data.data);

export const updateGPSLocation = (location) =>
  api.post('/gps', location).then((res) => res.data.data);