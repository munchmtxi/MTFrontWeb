// src/api/staff/profile/staffProfileApi.js
import axios from '../../axios';

const staffProfileApi = {
  getProfile: () => axios.get('/api/staff/profile'),
  updatePersonalInfo: (data) => axios.patch('/api/staff/profile/personal', data),
  updateVehicleInfo: (data) => axios.patch('/api/staff/profile/vehicle', data),
  changePassword: (data) => axios.patch('/api/staff/profile/password', data),
  toggleTwoFactorAuth: (data) => axios.patch('/api/staff/profile/2fa', data),
};

export default staffProfileApi;