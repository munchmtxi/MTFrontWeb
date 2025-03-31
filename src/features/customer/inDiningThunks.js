import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addItemToOrder as addItemApi,
  updateInDiningOrder as updateOrderApi,
  closeInDiningOrder as closeOrderApi,
  getInDiningOrderStatus as getStatusApi,
  payInDiningOrder as payOrderApi,
  getInDiningRecommendations as getRecommendationsApi,
  addTipToOrder as addTipApi,
  getActiveBookingSession as getSessionApi,
  addFriendFromSession as addFriendApi,
} from '../../api/customer/profile/inDiningOrderApi';

export const addItemToOrder = createAsyncThunk(
  'inDining/addItem',
  async ({ orderId, items }, { rejectWithValue }) => {
    try {
      return await addItemApi(orderId, items);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to add item');
    }
  }
);

export const updateInDiningOrder = createAsyncThunk(
  'inDining/updateOrder',
  async ({ orderId, updates }, { rejectWithValue }) => {
    try {
      return await updateOrderApi(orderId, updates);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to update order');
    }
  }
);

export const closeInDiningOrder = createAsyncThunk(
  'inDining/closeOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      return await closeOrderApi(orderId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to close order');
    }
  }
);

export const getInDiningOrderStatus = createAsyncThunk(
  'inDining/getOrderStatus',
  async (orderId, { rejectWithValue }) => {
    try {
      return await getStatusApi(orderId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to get order status');
    }
  }
);

export const payInDiningOrder = createAsyncThunk(
  'inDining/payOrder',
  async ({ orderId, paymentData }, { rejectWithValue }) => {
    try {
      return await payOrderApi(orderId, paymentData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to pay order');
    }
  }
);

export const getInDiningRecommendations = createAsyncThunk(
  'inDining/getRecommendations',
  async (branchId, { rejectWithValue }) => {
    try {
      return await getRecommendationsApi(branchId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to get recommendations');
    }
  }
);

export const addTipToOrder = createAsyncThunk(
  'inDining/addTip',
  async ({ orderId, tipData }, { rejectWithValue }) => {
    try {
      return await addTipApi(orderId, tipData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to add tip');
    }
  }
);

export const getActiveBookingSession = createAsyncThunk(
  'inDining/getActiveSession',
  async (orderId, { rejectWithValue }) => {
    try {
      return await getSessionApi(orderId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to get active session');
    }
  }
);

export const addFriendFromSession = createAsyncThunk(
  'inDining/addFriend',
  async ({ orderId, friendUserId }, { rejectWithValue }) => {
    try {
      return await addFriendApi(orderId, friendUserId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to add friend');
    }
  }
);