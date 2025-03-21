import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  changePassword as changePasswordApi,
  getPasswordHistory as getPasswordHistoryApi,
  getPasswordStrength as getPasswordStrengthApi,
} from '../../api/merchant/merchantPasswordApi';

export const changePassword = createAsyncThunk(
  'merchantPassword/changePassword',
  async ({ currentPassword, newPassword, passwordConfirmation }, { rejectWithValue }) => {
    try {
      return await changePasswordApi({ currentPassword, newPassword, passwordConfirmation });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

export const getPasswordHistory = createAsyncThunk(
  'merchantPassword/getPasswordHistory',
  async (_, { rejectWithValue }) => {
    try {
      return await getPasswordHistoryApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch password history');
    }
  }
);

export const getPasswordStrength = createAsyncThunk(
  'merchantPassword/getPasswordStrength',
  async (_, { rejectWithValue }) => {
    try {
      return await getPasswordStrengthApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch password strength');
    }
  }
);