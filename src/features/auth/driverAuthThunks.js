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
      const { accessToken, user } = response.data.data;
      const mappedUser = {
        ...user,
        role: user.roleId === 3 ? 'driver' : 'user' // Map roleId 3 to 'driver'
      };
      dispatch(setUser({ user: mappedUser, token: accessToken }));
      localStorage.setItem('token', accessToken);
      return { user: mappedUser, token: accessToken };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Driver login failed');
    }
  }
);