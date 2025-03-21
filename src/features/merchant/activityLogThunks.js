import { createAsyncThunk } from '@reduxjs/toolkit';
import activityLogApi from '@/api/merchant/activityLogApi';

export const fetchActivities = createAsyncThunk(
  'activityLog/fetchActivities',
  async ({ merchantId, options = { limit: 50, offset: 0 } }, { rejectWithValue }) => {
    console.log('Fetching activities for merchant:', merchantId, options);
    try {
      const data = await activityLogApi.fetchActivities(merchantId, options);
      console.log('Activities fetched:', data);
      return data;
    } catch (error) {
      console.error('Fetch activities error:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const validateActivityChain = createAsyncThunk(
  'activityLog/validateActivityChain',
  async (merchantId, { rejectWithValue }) => {
    try {
      const data = await activityLogApi.validateActivityChain(merchantId);
      return data; // Expecting { valid: boolean, reason?: string }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logActivity = createAsyncThunk(
  'activityLog/logActivity',
  async ({ merchantId, activityData }, { rejectWithValue }) => {
    try {
      const data = await activityLogApi.logActivity(merchantId, activityData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);