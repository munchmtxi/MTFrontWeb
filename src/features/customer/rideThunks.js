import { createAsyncThunk } from '@reduxjs/toolkit';
import rideApi from '../../api/customer/profile/rideApi';

export const requestRide = createAsyncThunk(
  'ride/requestRide',
  async (rideData, { rejectWithValue }) => {
    try {
      return await rideApi.requestRide(rideData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const processPayment = createAsyncThunk(
  'ride/processPayment',
  async ({ rideId, paymentDetails }, { rejectWithValue }) => {
    try {
      return await rideApi.processPayment(rideId, paymentDetails);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const scheduleRide = createAsyncThunk(
  'ride/scheduleRide',
  async ({ rideId, scheduleTime }, { rejectWithValue }) => {
    try {
      return await rideApi.scheduleRide(rideId, scheduleTime);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getRideHistory = createAsyncThunk(
  'ride/getRideHistory',
  async (params, { rejectWithValue }) => {
    try {
      const result = await rideApi.getRideHistory(params);
      console.log('getRideHistory result:', result);
      return result;
    } catch (error) {
      console.error('getRideHistory error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const trackRide = createAsyncThunk(
  'ride/trackRide',
  async (rideId, { rejectWithValue }) => {
    try {
      return await rideApi.trackRide(rideId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateRideStatus = createAsyncThunk(
  'ride/updateRideStatus',
  async ({ rideId, status }, { rejectWithValue }) => {
    try {
      return await rideApi.updateRideStatus(rideId, status);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);