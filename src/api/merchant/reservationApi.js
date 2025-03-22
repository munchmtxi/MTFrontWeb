import axios from '../axios';

const reservationApi = {
  getBookings: async (branchId, filters = {}) => {
    const response = await axios.get(`/api/merchant/reservation/branches/${branchId}/bookings`, { params: filters });
    return response.data;
  },
  getBookingById: async (bookingId) => {
    const response = await axios.get(`/api/merchant/bookings/${bookingId}`);
    return response.data;
  },
  createBooking: async (branchId, bookingData) => {
    const response = await axios.post(`/api/merchant/reservation/branches/${branchId}/bookings`, bookingData);
    return response.data;
  },
};

export default reservationApi;