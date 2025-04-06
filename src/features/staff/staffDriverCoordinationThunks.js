import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  assignDriver,
  confirmPickup,
  trackDelivery,
  completeOrder,
  getDriverOrderOverview,
} from '@api/staff/staffDriverCoordinationApi';

export const assignDriverThunk = createAsyncThunk(
  'staffDriverCoordination/assignDriver',
  async ({ orderId, driverId }, { rejectWithValue }) => {
    try {
      const response = await assignDriver(orderId, driverId);
      return response.data; // { order }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const confirmPickupThunk = createAsyncThunk(
  'staffDriverCoordination/confirmPickup',
  async ({ orderId, driverToken }, { rejectWithValue }) => {
    try {
      const response = await confirmPickup(orderId, driverToken);
      return response.data; // { order }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const trackDeliveryThunk = createAsyncThunk(
  'staffDriverCoordination/trackDelivery',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await trackDelivery(orderId);
      return response.data; // trackingData
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const completeOrderThunk = createAsyncThunk(
  'staffDriverCoordination/completeOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await completeOrder(orderId);
      return response.data; // { order }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getDriverOrderOverviewThunk = createAsyncThunk(
  'staffDriverCoordination/getDriverOrderOverview',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await getDriverOrderOverview(branchId);
      return response.data; // { orders, total }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);