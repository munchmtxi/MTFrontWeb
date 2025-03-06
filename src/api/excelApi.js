// C:\Users\munch\Desktop\MTFrontWeb\src\api\excelApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/excel'; // Adjust to your backend URL

const excelApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
excelApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming token is stored here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const exportReport = async (reportData) => {
  const response = await excelApi.post('/export', reportData, {
    responseType: 'blob', // For file download
  });
  return response.data;
};

export const scheduleReport = async (scheduleData) => {
  const response = await excelApi.post('/schedule', scheduleData);
  return response.data;
};