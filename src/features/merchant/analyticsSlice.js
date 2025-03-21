import { createSlice } from '@reduxjs/toolkit';
import {
  getAnalyticsSummary,
  getActiveViewers,
  getDetailedAnalytics,
} from './analyticsThunks';

const initialState = {
  summary: null,
  activeViewers: [],
  detailed: [],
  status: 'idle',
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalyticsSummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAnalyticsSummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.summary = action.payload;
      })
      .addCase(getAnalyticsSummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getActiveViewers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getActiveViewers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeViewers = action.payload;
      })
      .addCase(getActiveViewers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getDetailedAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDetailedAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detailed = action.payload;
      })
      .addCase(getDetailedAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;