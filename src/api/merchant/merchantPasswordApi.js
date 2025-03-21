import axiosInstance from '../axios';

export const changePassword = async ({ currentPassword, newPassword, passwordConfirmation }) => {
  const response = await axiosInstance.post('/api/merchant/profile/password/change', {
    currentPassword,
    newPassword,
    passwordConfirmation,
  });
  return response.data;
};

export const getPasswordHistory = async () => {
  const response = await axiosInstance.get('/api/merchant/profile/password/history');
  return response.data.data;
};

export const getPasswordStrength = async () => {
  const response = await axiosInstance.get('/api/merchant/profile/password/strength');
  return response.data.strength;
};