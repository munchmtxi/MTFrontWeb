import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  startPreview as startPreviewApi,
  updatePreview as updatePreviewApi,
  endPreview as endPreviewApi,
  getPreview as getPreviewApi,
} from '../../api/merchant/merchantPreviewApi';

export const startPreview = createAsyncThunk(
  'merchantPreview/startPreview',
  async (merchantId, { rejectWithValue }) => {
    try {
      return await startPreviewApi(merchantId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to start preview');
    }
  }
);

export const updatePreview = createAsyncThunk(
  'merchantPreview/updatePreview',
  async ({ merchantId, updates }, { rejectWithValue }) => {
    try {
      return await updatePreviewApi(merchantId, updates);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update preview');
    }
  }
);

export const endPreview = createAsyncThunk(
  'merchantPreview/endPreview',
  async (merchantId, { rejectWithValue }) => {
    try {
      return await endPreviewApi(merchantId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to end preview');
    }
  }
);

export const getPreview = createAsyncThunk(
  'merchantPreview/getPreview',
  async (merchantId, { rejectWithValue }) => {
    try {
      return await getPreviewApi(merchantId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get preview');
    }
  }
);