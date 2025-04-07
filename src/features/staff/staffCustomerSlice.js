import { createSlice } from '@reduxjs/toolkit';
import { checkInCustomerThunk, requestAssistanceThunk, processBillThunk } from './staffCustomerThunks';

const initialState = {
  bookings: [],
  notifications: [],
  orders: [],
  loading: false,
  error: null,
};

const staffCustomerSlice = createSlice({
  name: 'staffCustomer',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Check-In
      .addCase(checkInCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkInCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload.data.booking);
      })
      .addCase(checkInCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to check in customer';
      })
      // Assistance Request
      .addCase(requestAssistanceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestAssistanceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.push(action.payload.data.notification);
      })
      .addCase(requestAssistanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to request assistance';
      })
      // Process Bill
      .addCase(processBillThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processBillThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.data.order);
      })
      .addCase(processBillThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to process bill';
      });
  },
});

export const { clearError, resetState } = staffCustomerSlice.actions;
export default staffCustomerSlice.reducer;