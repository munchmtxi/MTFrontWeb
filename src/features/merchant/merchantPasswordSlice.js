import { createSlice } from '@reduxjs/toolkit';
import {
  changePassword,
  getPasswordHistory,
  getPasswordStrength,
} from './merchantPasswordThunks';

const initialState = {
  passwordHistory: [],
  passwordStrength: null,
  status: 'idle',
  error: null,
};

const merchantPasswordSlice = createSlice({
  name: 'merchantPassword',
  initialState,
  reducers: {
    resetPasswordState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getPasswordHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPasswordHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.passwordHistory = action.payload;
      })
      .addCase(getPasswordHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getPasswordStrength.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPasswordStrength.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.passwordStrength = action.payload;
      })
      .addCase(getPasswordStrength.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetPasswordState } = merchantPasswordSlice.actions;
export default merchantPasswordSlice.reducer;