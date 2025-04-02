import axiosInstance from '../axios';

const API_URL = '/api/v1/driver';

const driverAvailabilityApi = {
  // Get driver availability
  getAvailability: async (driverId) => {
    const response = await axiosInstance.get(`${API_URL}/${driverId}/availability`);
    return response.data.data;
  },

  // Toggle online status
  toggleStatus: async (driverId, isOnline) => {
    const response = await axiosInstance.patch(
      `${API_URL}/${driverId}/status`,
      { isOnline }
    );
    return response.data.data;
  },

  // Set driver shift
  setShift: async (driverId, shiftData) => {
    const response = await axiosInstance.post(
      `${API_URL}/${driverId}/shift`,
      shiftData
    );
    return response.data.data;
  },

  // Simulate availability (for testing)
  simulateAvailability: async (driverId) => {
    const response = await axiosInstance.post(
      `${API_URL}/${driverId}/simulate`,
      {}
    );
    return response.data.data;
  },

  // Get device status
  getDeviceStatus: async (driverId) => {
    const response = await axiosInstance.get(`${API_URL}/${driverId}/device`);
    return response.data.data;
  },
};

export default driverAvailabilityApi;