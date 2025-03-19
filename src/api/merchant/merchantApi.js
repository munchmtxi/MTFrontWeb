import axiosInstance from '@/api/axios'; // Adjust path based on your file location

// API Functions mapped to your endpoints
export const getMerchantProfile = async () => {
  const response = await axiosInstance.get('/merchant/profile');
  return response.data;
};

export const getApiMerchantProfile = async () => {
  const response = await axiosInstance.get('/api/merchant/profile');
  return response.data;
};

export const updateMerchantProfile = async (profileData) => {
  const response = await axiosInstance.patch('/api/merchant/profile', profileData);
  return response.data;
};

export const updateBusinessHours = async (hoursData) => {
  const response = await axiosInstance.patch('/api/merchant/profile/business-hours', hoursData);
  return response.data;
};

export const updateDeliverySettings = async (settingsData) => {
  const response = await axiosInstance.patch('/api/merchant/profile/delivery-settings', settingsData);
  return response.data;
};

export const createBranch = async (branchData) => {
  const response = await axiosInstance.post('/api/merchant/profile/branches', branchData);
  return response.data;
};

export const updateBranch = async (branchId, branchData) => {
  const response = await axiosInstance.patch(`/api/merchant/profile/branches/${branchId}`, branchData);
  return response.data;
};

export const getProfileByMerchantId = async (merchantId) => {
  const response = await axiosInstance.get(`/merchant/profile/${merchantId}`);
  return response.data;
};