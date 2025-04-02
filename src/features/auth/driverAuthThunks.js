import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api/axios';
import { setUser } from './authSlice';

export const driverLogin = createAsyncThunk(
  'auth/driverLogin',
  async ({ email, password, deviceId, deviceType }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/driver/login', { 
        email, 
        password, 
        deviceId, 
        deviceType 
      });
      console.log('Driver login response:', response.data);

      const { accessToken, user, refreshToken } = response.data.data;
      console.log('Raw user object:', user);
      console.log('Role ID value:', user.roleId, 'Type:', typeof user.roleId);

      const mappedUser = {
        ...user,
        role: Number(user.roleId) === 3 ? 'driver' : (user.role || 'unknown'),
        driver_profile: user.driver || { id: user.id },
      };
      console.log('Mapped user:', mappedUser);

      dispatch(setUser({ user: mappedUser, token: accessToken }));
      localStorage.setItem('token', accessToken);
      return { user: mappedUser, token: accessToken, refreshToken };
    } catch (error) {
      console.error('Driver login error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Driver login failed');
    }
  }
);