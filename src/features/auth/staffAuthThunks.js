import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '@/api/auth/authApi';
import { setUser } from './authSlice';

export const staffLogin = createAsyncThunk(
  'auth/staffLogin',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      console.log('Starting staffLogin with:', { email, password });
      const response = await authApi.login({ email, password });
      console.log('Staff login response:', response.data);

      const { token, user } = response.data.data;
      if (!token || !user) {
        console.error('Missing token or user in response:', response.data);
        return rejectWithValue('Invalid server response: missing token or user');
      }

      const roleId = user.roleId || user.role_id;
      const mappedUser = {
        ...user,
        role: roleId === 19 ? 'merchant' : roleId === 4 ? 'staff' : roleId === 5 ? 'driver' : roleId === 1 ? 'admin' : 'user'
      };
      console.log('Mapped user:', mappedUser);

      const action = dispatch(setUser({ user: mappedUser, token }));
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage');

      return action.payload; // Ensure thunk fulfills with dispatched payload
    } catch (error) {
      console.error('Staff login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);