import { createSlice } from '@reduxjs/toolkit';
import {
  addItemToOrder,
  updateInDiningOrder,
  closeInDiningOrder,
  getInDiningOrderStatus,
  payInDiningOrder,
  getInDiningRecommendations,
  addTipToOrder,
  getActiveBookingSession,
  addFriendFromSession,
} from './inDiningThunks';

const initialState = {
  orders: {},
  recommendations: [],
  activeSession: null,
  loading: false,
  error: null,
};

const inDiningSlice = createSlice({
  name: 'inDining',
  initialState,
  reducers: {
    resetInDiningError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders[action.meta.arg.orderId] = action.payload.data.order;
      })
      .addCase(addItemToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateInDiningOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInDiningOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders[action.meta.arg.orderId] = action.payload.data;
      })
      .addCase(updateInDiningOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(closeInDiningOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(closeInDiningOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders[action.meta.arg.orderId] = action.payload.data;
      })
      .addCase(closeInDiningOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getInDiningOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInDiningOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders[action.meta.arg.orderId] = action.payload.data.order;
      })
      .addCase(getInDiningOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(payInDiningOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payInDiningOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders[action.meta.arg.orderId].payment = action.payload.data;
      })
      .addCase(payInDiningOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getInDiningRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInDiningRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload.data;
      })
      .addCase(getInDiningRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTipToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTipToOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders[action.meta.arg.orderId].payment = action.payload.data;
      })
      .addCase(addTipToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getActiveBookingSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveBookingSession.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSession = action.payload.data;
      })
      .addCase(getActiveBookingSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFriendFromSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFriendFromSession.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addFriendFromSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetInDiningError } = inDiningSlice.actions;
export default inDiningSlice.reducer;