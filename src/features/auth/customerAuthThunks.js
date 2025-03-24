import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api/axios';
import { setUser } from './authSlice';

export const customerLogin = createAsyncThunk(
  'auth/customerLogin',
  async ({ email, password, deviceInfo }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
        deviceInfo,
      });
      const { user, token } = response.data.data;
      const mappedUser = {
        ...user,
        role: user.roleId === 2 ? 'customer' : 'user', // Map roleId 2 to 'customer'
      };
      dispatch(setUser({ user: mappedUser, token }));
      localStorage.setItem('token', token);
      return { user: mappedUser, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Customer login failed');
    }
  }
);