import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api/axios';
import { setUser } from './authSlice';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, deviceId, deviceType }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/merchant/login', { 
        email, 
        password, 
        deviceId, 
        deviceType,
        rememberMe: false 
      });
      const { accessToken, user } = response.data.data;
      const mappedUser = {
        ...user,
        role: user.roleId === 19 ? 'merchant' : 'user' // Map roleId to role
      };
      dispatch(setUser({ user: mappedUser, token: accessToken }));
      localStorage.setItem('token', accessToken);
      return { user: mappedUser, token: accessToken };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);