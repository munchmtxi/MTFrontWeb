import axiosInstance from '../axios';

export const getPlacePredictions = async (input, sessionToken) => {
  const response = await axiosInstance.get('/api/v1/merchants/profile/maps/predictions', {
    params: { input, sessionToken },
  });
  return response.data.data.predictions;
};

export const getPlaceDetails = async (placeId, sessionToken) => {
  const response = await axiosInstance.get('/api/v1/merchants/profile/maps/details', {
    params: { placeId, sessionToken },
  });
  return response.data.data.details;
};

export const updateMerchantAddress = async (addressData) => {
  const response = await axiosInstance.patch('/api/v1/merchants/profile/maps/update-address', addressData);
  return response.data.data.merchant;
};