import axiosInstance from '../axios';

export const startPreview = async (merchantId) => {
  const response = await axiosInstance.post(`/api/v1/merchants/${merchantId}/preview/start`);
  return response.data.data;
};

export const updatePreview = async (merchantId, updates) => {
  const response = await axiosInstance.patch(`/api/v1/merchants/${merchantId}/preview/update`, updates);
  return response.data.data;
};

export const endPreview = async (merchantId) => {
  const response = await axiosInstance.delete(`/api/v1/merchants/${merchantId}/preview/end`);
  return response.data.data;
};

export const getPreview = async (merchantId) => {
  const response = await axiosInstance.get(`/api/v1/merchants/${merchantId}/preview`);
  return response.data.data;
};