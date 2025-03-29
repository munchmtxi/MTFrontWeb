// src/features/customer/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentOrder: null,
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setOrderSuccess(state, action) {
      state.loading = false;
      state.currentOrder = action.payload;
      state.orders = [...state.orders.filter(o => o.order_id !== action.payload.order_id), action.payload];
    },
    setOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearOrderError(state) {
      state.error = null;
    },
  },
});

export const { setOrderLoading, setOrderSuccess, setOrderFailure, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;