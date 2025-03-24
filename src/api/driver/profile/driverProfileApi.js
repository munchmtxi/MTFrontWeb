import axios from '@/api/axios';

const driverProfileApi = {
  getProfile: async () => {
    const response = await axios.get('/api/driver/profile');
    return response.data.data;
  },

  updatePersonalInfo: async (data) => {
    const response = await axios.patch('/api/driver/profile/personal', data);
    return response.data.data;
  },

  updateVehicleInfo: async (data) => {
    const response = await axios.patch('/api/driver/profile/vehicle', data);
    return response.data.data;
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    const response = await axios.patch('/api/driver/profile/password', { currentPassword, newPassword });
    return response.data;
  },
};

export default driverProfileApi;