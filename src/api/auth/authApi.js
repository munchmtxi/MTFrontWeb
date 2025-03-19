import axios from '../axios';

const authApi = {
  login: (credentials) => axios.post('/auth/login', credentials),
  merchantLogin: (credentials) => axios.post('/auth/merchant/login', credentials), // Add this
  register: (userData) => axios.post('/auth/register', userData),
  verify2FA: (data) => axios.post('/auth/2fa/verify', data),
  logout: () => axios.post('/auth/logout'),
};

export default authApi;