import { createAsyncThunk } from '@reduxjs/toolkit';
import subscriptionApi from '@/api/customer/profile/subscriptionApi';

export const fetchSubscriptions = createAsyncThunk(
  'subscription/fetchSubscriptions',
  async (_, { rejectWithValue }) => {
    try {
      return await subscriptionApi.getSubscriptions();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createSubscription = createAsyncThunk(
  'subscription/createSubscription',
  async (subscriptionData, { rejectWithValue }) => {
    try {
      return await subscriptionApi.createSubscription(subscriptionData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateSubscription = createAsyncThunk(
  'subscription/updateSubscription',
  async ({ subscriptionId, data }, { rejectWithValue }) => {
    try {
      return await subscriptionApi.updateSubscription(subscriptionId, data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  'subscription/cancelSubscription',
  async ({ subscriptionId, reason }, { rejectWithValue }) => {
    try {
      return await subscriptionApi.cancelSubscription(subscriptionId, reason);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);