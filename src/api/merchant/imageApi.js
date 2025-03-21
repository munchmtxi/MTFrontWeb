import axiosInstance from '../axios';

export const uploadImage = async (imageFile, imageType) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('imageType', imageType);

  const response = await axiosInstance.post('/api/merchant/profile/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const deleteImage = async (imageType) => {
  const response = await axiosInstance.delete(`/api/merchant/profile/images/${imageType}`);
  return response.data;
};