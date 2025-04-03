import axios from '@api/axios';

const driverPaymentApi = {
  addTip: async (paymentId, tipData) => {
    const response = await axios.post(`/api/v1/driver/payments/${paymentId}/tip`, tipData);
    return response.data;
  },

  getEarnings: async () => {
    const response = await axios.get('/api/v1/driver/earnings');
    return response.data;
  },

  requestPayout: async (amount) => {
    const response = await axios.post('/api/v1/driver/payout', { amount });
    return response.data;
  },
};

export default driverPaymentApi;