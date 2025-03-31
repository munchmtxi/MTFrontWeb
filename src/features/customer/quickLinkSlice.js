import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkIn, callStaff, requestBill } from '@/api/customer/profile/quickLinkApi';

// Thunks
export const checkInThunk = createAsyncThunk(
  'quickLink/checkIn',
  async ({ userId, bookingId }, { rejectWithValue }) => {
    try {
      const response = await checkIn(userId, bookingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const callStaffThunk = createAsyncThunk(
  'quickLink/callStaff',
  async ({ userId, tableId, requestType }, { rejectWithValue }) => {
    try {
      const response = await callStaff(userId, tableId, requestType);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const requestBillThunk = createAsyncThunk(
  'quickLink/requestBill',
  async ({ userId, inDiningOrderId, paymentMethod, splitWith }, { rejectWithValue }) => {
    try {
      const response = await requestBill(userId, inDiningOrderId, paymentMethod, splitWith);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const quickLinkSlice = createSlice({
  name: 'quickLink',
  initialState: {
    checkInData: null,
    callStaffData: null,
    billData: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check In
      .addCase(checkInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.checkInData = action.payload;
      })
      .addCase(checkInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to check in';
      })
      // Call Staff
      .addCase(callStaffThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(callStaffThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.callStaffData = action.payload;
      })
      .addCase(callStaffThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to call staff';
      })
      // Request Bill
      .addCase(requestBillThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestBillThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.billData = action.payload;
      })
      .addCase(requestBillThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to request bill';
      });
  },
});

export const { resetError } = quickLinkSlice.actions;
export default quickLinkSlice.reducer;