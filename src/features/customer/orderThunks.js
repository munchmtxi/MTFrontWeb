// src/features/customer/orderThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkoutOrder, getOrderStatus, requestFeedback } from '../../api/customer/profile/orderApi';

export const checkout = createAsyncThunk(
  'order/checkout',
  async ({ customerId, paymentMethod, cartId }, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'order/setOrderLoading' });
      const order = await checkoutOrder(customerId, paymentMethod, cartId);
      dispatch({ type: 'order/setOrderSuccess', payload: order });
      return order;
    } catch (error) {
      dispatch({ type: 'order/setOrderFailure', payload: error.message || 'Checkout failed' });
      return rejectWithValue(error);
    }
  }
);

export const fetchOrderStatus = createAsyncThunk(
  'order/fetchStatus',
  async (orderId, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'order/setOrderLoading' });
      const status = await getOrderStatus(orderId);
      dispatch({ type: 'order/setOrderSuccess', payload: status });
      return status;
    } catch (error) {
      dispatch({ type: 'order/setOrderFailure', payload: error.message || 'Failed to fetch order status' });
      return rejectWithValue(error);
    }
  }
);

export const submitFeedback = createAsyncThunk(
  'order/submitFeedback',
  async (orderId, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'order/setOrderLoading' });
      const result = await requestFeedback(orderId);
      dispatch({ type: 'order/setOrderSuccess', payload: result });
      return result;
    } catch (error) {
      dispatch({ type: 'order/setOrderFailure', payload: error.message || 'Feedback request failed' });
      return rejectWithValue(error);
    }
  }
);