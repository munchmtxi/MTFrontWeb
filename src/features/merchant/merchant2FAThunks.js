import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setup2FA as setup2FAApi,
  enable2FA as enable2FAApi,
  verify2FA as verify2FAApi,
  disable2FA as disable2FAApi,
  updatePreferredMethod as updatePreferredMethodApi,
  generateNewBackupCodes as generateNewBackupCodesApi,
} from '../../api/merchant/merchant2FAApi';

export const setup2FA = createAsyncThunk(
  'merchant2FA/setup2FA',
  async (method, { rejectWithValue }) => {
    try {
      return await setup2FAApi(method);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to setup 2FA');
    }
  }
);

export const enable2FA = createAsyncThunk(
  'merchant2FA/enable2FA',
  async ({ token, method }, { rejectWithValue }) => {
    try {
      return await enable2FAApi(token, method);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to enable 2FA');
    }
  }
);

export const verify2FA = createAsyncThunk(
  'merchant2FA/verify2FA',
  async ({ token, method }, { rejectWithValue }) => {
    try {
      return await verify2FAApi(token, method);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to verify 2FA');
    }
  }
);

export const disable2FA = createAsyncThunk(
  'merchant2FA/disable2FA',
  async (token, { rejectWithValue }) => {
    try {
      return await disable2FAApi(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to disable 2FA');
    }
  }
);

export const updatePreferredMethod = createAsyncThunk(
  'merchant2FA/updatePreferredMethod',
  async ({ newMethod, token }, { rejectWithValue }) => {
    try {
      return await updatePreferredMethodApi(newMethod, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update 2FA method');
    }
  }
);

export const generateNewBackupCodes = createAsyncThunk(
  'merchant2FA/generateNewBackupCodes',
  async (token, { rejectWithValue }) => {
    try {
      return await generateNewBackupCodesApi(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate backup codes');
    }
  }
);