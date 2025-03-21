import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAnalyticsSummary,
  fetchActiveViewers,
  fetchDetailedAnalytics,
} from '../../api/merchant/analyticsApi';

export const getAnalyticsSummary = createAsyncThunk(
  'analytics/getAnalyticsSummary',
  async ({ merchantId, period }, { rejectWithValue }) => {
    try {
      return await fetchAnalyticsSummary(merchantId, period);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics summary');
    }
  }
);

export const getActiveViewers = createAsyncThunk(
  'analytics/getActiveViewers',
  async (merchantId, { rejectWithValue }) => {
    try {
      return await fetchActiveViewers(merchantId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch active viewers');
    }
  }
);

export const getDetailedAnalytics = createAsyncThunk(
  'analytics/getDetailedAnalytics',
  async ({ merchantId, filters }, { rejectWithValue }) => {
    try {
      return await fetchDetailedAnalytics(merchantId, filters);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch detailed analytics');
    }
  }
);