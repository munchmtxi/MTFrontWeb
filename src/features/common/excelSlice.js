// C:\Users\munch\Desktop\MTFrontWeb\src\features\common\excelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reportStatus: 'idle', // idle, loading, succeeded, failed
  scheduleStatus: 'idle',
  error: null,
};

const excelSlice = createSlice({
  name: 'excel',
  initialState,
  reducers: {
    exportReportStart(state) {
      state.reportStatus = 'loading';
      state.error = null;
    },
    exportReportSuccess(state) {
      state.reportStatus = 'succeeded';
    },
    exportReportFailure(state, action) {
      state.reportStatus = 'failed';
      state.error = action.payload;
    },
    scheduleReportStart(state) {
      state.scheduleStatus = 'loading';
      state.error = null;
    },
    scheduleReportSuccess(state) {
      state.scheduleStatus = 'succeeded';
    },
    scheduleReportFailure(state, action) {
      state.scheduleStatus = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  exportReportStart,
  exportReportSuccess,
  exportReportFailure,
  scheduleReportStart,
  scheduleReportSuccess,
  scheduleReportFailure,
} = excelSlice.actions;

export default excelSlice.reducer;