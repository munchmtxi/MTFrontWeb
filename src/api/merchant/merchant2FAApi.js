import axiosInstance from '../axios';

export const setup2FA = async (method) => {
  const response = await axiosInstance.post('/api/merchant/profile/2fa/setup', { method });
  return response.data.data;
};

export const enable2FA = async (token, method) => {
  const response = await axiosInstance.post('/api/merchant/profile/2fa/enable', { token, method });
  return response.data.data;
};

export const verify2FA = async (token, method) => {
  const response = await axiosInstance.post('/api/merchant/profile/2fa/verify', { token, method });
  return response.data.data;
};

export const disable2FA = async (token) => {
  const response = await axiosInstance.post('/api/merchant/profile/2fa/disable', { token });
  return response.data.data;
};

export const updatePreferredMethod = async (newMethod, token) => {
  const response = await axiosInstance.put('/api/merchant/profile/2fa/method', { newMethod, token });
  return response.data.data;
};

export const generateNewBackupCodes = async (token) => {
  const response = await axiosInstance.post('/api/merchant/profile/2fa/backup-codes', { token });
  return response.data.data;
};