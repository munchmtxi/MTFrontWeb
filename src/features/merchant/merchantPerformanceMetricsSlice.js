import { createSlice } from '@reduxjs/toolkit';
import {
  getPerformanceMetrics,
  updateMetricsForOrder,
  recalculateMetrics,
} from './merchantPerformanceMetricsThunks';

const initialState = {
  metrics: [],
  status: 'idle',
  error: null,
};

const merchantPerformanceMetricsSlice = createSlice({
  name: 'merchantPerformanceMetrics',
  initialState,
  reducers: {
    resetMetricsState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPerformanceMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPerformanceMetrics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.metrics = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(getPerformanceMetrics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateMetricsForOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMetricsForOrder.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateMetricsForOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(recalculateMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(recalculateMetrics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.metrics = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(recalculateMetrics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetMetricsState } = merchantPerformanceMetricsSlice.actions;
export default merchantPerformanceMetricsSlice.reducer;