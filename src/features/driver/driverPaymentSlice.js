import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import driverPaymentApi from '@api/driver/driverPaymentApi';

export const addTip = createAsyncThunk(
  'driverPayment/addTip',
  async ({ paymentId, tipData }, { rejectWithValue }) => {
    try {
      return await driverPaymentApi.addTip(paymentId, tipData);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add tip');
    }
  }
);

export const fetchEarnings = createAsyncThunk(
  'driverPayment/fetchEarnings',
  async (_, { rejectWithValue }) => {
    try {
      return await driverPaymentApi.getEarnings();
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch earnings');
    }
  }
);

export const requestPayout = createAsyncThunk(
  'driverPayment/requestPayout',
  async (amount, { rejectWithValue }) => {
    try {
      return await driverPaymentApi.requestPayout(amount);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to request payout');
    }
  }
);

const driverPaymentSlice = createSlice({
  name: 'driverPayment',
  initialState: {
    earnings: { driver_id: null, total_earned: 0, updated_at: null },
    lastTipPayment: null,
    lastPayout: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTip.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTip.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastTipPayment = action.payload.data.payment;
        state.earnings = action.payload.data.earnings;
      })
      .addCase(addTip.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchEarnings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.earnings = action.payload.data.earnings;
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(requestPayout.pending, (state) => {
        state.status = 'loading'; // Fixed typo from 'solving' to 'loading'
      })
      .addCase(requestPayout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastPayout = action.payload.data.payout;
        state.earnings.total_earned -= action.payload.data.payout.amount;
      })
      .addCase(requestPayout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = driverPaymentSlice.actions;
export default driverPaymentSlice.reducer;