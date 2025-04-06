import { createSlice } from '@reduxjs/toolkit';
import {
  assignDriverThunk,
  confirmPickupThunk,
  trackDeliveryThunk,
  completeOrderThunk,
  getDriverOrderOverviewThunk,
} from '@features/staff/staffDriverCoordinationThunks';

const initialState = {
  orders: [],
  tracking: null,
  loading: false,
  error: null,
};

const staffDriverCoordinationSlice = createSlice({
  name: 'staffDriverCoordination',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Assign Driver
      .addCase(assignDriverThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignDriverThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.order.id ? action.payload.order : order
        );
      })
      .addCase(assignDriverThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Confirm Pickup
      .addCase(confirmPickupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPickupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.order.id ? action.payload.order : order
        );
      })
      .addCase(confirmPickupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Track Delivery
      .addCase(trackDeliveryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackDeliveryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tracking = action.payload;
      })
      .addCase(trackDeliveryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Complete Order
      .addCase(completeOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.order.id ? action.payload.order : order
        );
      })
      .addCase(completeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get Driver Order Overview
      .addCase(getDriverOrderOverviewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDriverOrderOverviewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getDriverOrderOverviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = staffDriverCoordinationSlice.actions;
export default staffDriverCoordinationSlice.reducer;