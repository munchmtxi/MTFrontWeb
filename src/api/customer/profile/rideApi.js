import axios from '../../../api/axios';

const rideApi = {
  requestRide: async (data) => {
    const response = await axios.post('/api/v1/rides/request', data);
    return response.data.data.ride;
  },

  processPayment: async (rideId, paymentDetails) => {
    const response = await axios.post(`/api/v1/rides/${rideId}/payment`, paymentDetails);
    return response.data.data;
  },

  scheduleRide: async (rideId, scheduleTime) => {
    const response = await axios.patch(`/api/v1/rides/${rideId}/schedule`, { scheduleTime });
    return response.data.data.ride;
  },

  getRideHistory: async ({ page = 1, limit = 10 }) => {
    const response = await axios.get('/api/v1/rides/history', { params: { page, limit } });
    return response.data.data;
  },

  trackRide: async (rideId) => {
    const response = await axios.get(`/api/v1/rides/${rideId}/track`);
    return response.data.data;
  },

  updateRideStatus: async (rideId, status) => {
    const response = await axios.patch(`/api/v1/rides/${rideId}/status`, { status });
    return response.data.data.ride;
  },
};

export default rideApi;