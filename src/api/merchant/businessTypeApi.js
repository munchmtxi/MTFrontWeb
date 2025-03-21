import axiosInstance from '@/api/axios';

const businessTypeApi = {
  getBusinessType: async () => {
    const response = await axiosInstance.get('/api/merchant/profile/business-type');
    return response.data.data; // Extract business_type and business_type_details
  },

  updateBusinessType: async (updateData) => {
    const response = await axiosInstance.put('/api/merchant/profile/business-type', updateData);
    return response.data.data; // Extract updated merchant data
  },

  getBusinessTypeRequirements: async (businessType) => {
    const response = await axiosInstance.get(`/api/merchant/profile/business-type/requirements/${businessType}`);
    return response.data.data;
  },
};

export default businessTypeApi;