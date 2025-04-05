import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPerformanceMetrics,
  calculateRewards,
  assignTier,
  redeemRewards,
} from '../../api/staff/performanceIncentiveApi';
import {
  setMetrics,
  setPoints,
  setTier,
  addRedemption,
  setLoading,
  setError,
} from './performanceIncentiveSlice';

export const fetchPerformanceMetrics = createAsyncThunk(
  'performanceIncentive/fetchMetrics',
  async (staffId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const metrics = await getPerformanceMetrics(staffId);
      dispatch(setMetrics(metrics));
      return metrics;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to fetch metrics';
      dispatch(setError(errorMsg));
      return rejectWithValue(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const calculatePerformanceRewards = createAsyncThunk(
  'performanceIncentive/calculateRewards',
  async (staffId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const points = await calculateRewards(staffId);
      dispatch(setPoints(points));
      return points;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to calculate rewards';
      dispatch(setError(errorMsg));
      return rejectWithValue(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const assignPerformanceTier = createAsyncThunk(
  'performanceIncentive/assignTier',
  async (staffId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const tier = await assignTier(staffId);
      dispatch(setTier(tier));
      return tier;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to assign tier';
      dispatch(setError(errorMsg));
      return rejectWithValue(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const redeemPerformanceRewards = createAsyncThunk(
  'performanceIncentive/redeemRewards',
  async ({ staffId, rewardType, pointsToRedeem }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const redemption = await redeemRewards(staffId, rewardType, pointsToRedeem);
      dispatch(addRedemption(redemption));
      return redemption;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to redeem rewards';
      dispatch(setError(errorMsg));
      return rejectWithValue(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
);