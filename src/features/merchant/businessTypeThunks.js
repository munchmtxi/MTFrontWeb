import { createAsyncThunk } from '@reduxjs/toolkit';
import businessTypeApi from '@/api/merchant/businessTypeApi';

export const fetchBusinessType = createAsyncThunk(
  'businessType/fetchBusinessType',
  async (_, { rejectWithValue }) => {
    try {
      const data = await businessTypeApi.getBusinessType();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateBusinessType = createAsyncThunk(
  'businessType/updateBusinessType',
  async (updateData, { rejectWithValue }) => {
    try {
      const data = await businessTypeApi.updateBusinessType(updateData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);