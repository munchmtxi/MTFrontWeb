import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkInCustomer, requestAssistance, processBill } from '@/api/staff/staffCustomerApi';

export const checkInCustomerThunk = createAsyncThunk(
  'staffCustomer/checkInCustomer',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await checkInCustomer(bookingId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Check-in failed');
    }
  }
);

export const requestAssistanceThunk = createAsyncThunk(
  'staffCustomer/requestAssistance',
  async ({ tableId, requestType }, { rejectWithValue }) => {
    try {
      const response = await requestAssistance(tableId, requestType);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Assistance request failed');
    }
  }
);

export const processBillThunk = createAsyncThunk(
  'staffCustomer/processBill',
  async ({ orderId, paymentMethod, splitWith }, { rejectWithValue }) => {
    try {
      const response = await processBill(orderId, paymentMethod, splitWith);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Bill processing failed');
    }
  }
);