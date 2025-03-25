import axios from '../../../axios';

const bookingApi = {
  // Fetch available tables
  getAvailableTables: async ({ branchId, bookingDate, bookingTime }) => {
    const response = await axios.get('/api/customer/bookings/available', {
      params: { branchId, bookingDate, bookingTime },
    });
    return response.data;
  },

  // Reserve a table
  reserveTable: async ({ merchantId, branchId, tableId, bookingDate, bookingTime, guestCount }) => {
    const response = await axios.post('/api/customer/bookings/reserve', {
      merchantId,
      branchId,
      tableId,
      bookingDate,
      bookingTime,
      guestCount,
    });
    return response.data;
  },
};

export default bookingApi;