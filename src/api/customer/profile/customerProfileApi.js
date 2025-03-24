import axios from '../../axios';

const customerProfileApi = {
  getProfile: () => axios.get('/api/customer/profile'),
  updateProfile: (data) => axios.put('/api/customer/profile', data),
  changePassword: (data) => axios.put('/api/customer/profile/password', data),
  managePaymentMethods: (data) => axios.put('/api/customer/profile/payment-methods', data),
};

export default customerProfileApi;