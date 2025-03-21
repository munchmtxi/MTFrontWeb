import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPerformanceMetrics as getPerformanceMetricsApi,
  updateMetricsForOrder as updateMetricsForOrderApi,
  recalculateMetrics as recalculateMetricsApi,
} from '../../api/merchant/merchantPerformanceMetricsApi';

export const getPerformanceMetrics = createAsyncThunk(
  'merchantPerformanceMetrics/getPerformanceMetrics',
  async ({ periodType, startDate, endDate }, { rejectWithValue }) => {
    try {
      return await getPerformanceMetricsApi({ periodType, startDate, endDate });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch performance metrics');
    }
  }
);

export const updateMetricsForOrder = createAsyncThunk(
  'merchantPerformanceMetrics/updateMetricsForOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      return await updateMetricsForOrderApi(orderId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update metrics for order');
    }
  }
);

export const recalculateMetrics = createAsyncThunk(
  'merchantPerformanceMetrics/recalculateMetrics',
  async ({ periodType, startDate, endDate }, { rejectWithValue }) => {
    try {
      return await recalculateMetricsApi({ periodType, startDate, endDate });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to recalculate metrics');
    }
  }
);