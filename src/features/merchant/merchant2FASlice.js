import { createSlice } from '@reduxjs/toolkit';
import {
  setup2FA,
  enable2FA,
  verify2FA,
  disable2FA,
  updatePreferredMethod,
  generateNewBackupCodes,
} from './merchant2FAThunks';

const initialState = {
  setupData: null,
  backupCodes: [],
  isEnabled: false,
  preferredMethod: 'authenticator',
  status: 'idle',
  error: null,
};

const merchant2FASlice = createSlice({
  name: 'merchant2FA',
  initialState,
  reducers: {
    reset2FAState: (state) => {
      state.setupData = null;
      state.backupCodes = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setup2FA.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setup2FA.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.setupData = action.payload;
        state.isEnabled = false;
      })
      .addCase(setup2FA.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(enable2FA.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(enable2FA.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isEnabled = true;
        state.backupCodes = action.payload.backupCodes || [];
        state.setupData = null; // Clear setup data after enabling
      })
      .addCase(enable2FA.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(verify2FA.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isEnabled = action.payload.verified ? state.isEnabled : false;
      })
      .addCase(verify2FA.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(disable2FA.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(disable2FA.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isEnabled = false;
        state.backupCodes = [];
      })
      .addCase(disable2FA.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updatePreferredMethod.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePreferredMethod.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.preferredMethod = action.payload.newMethod || state.preferredMethod;
      })
      .addCase(updatePreferredMethod.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(generateNewBackupCodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateNewBackupCodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.backupCodes = action.payload.backupCodes || [];
      })
      .addCase(generateNewBackupCodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { reset2FAState } = merchant2FASlice.actions;
export default merchant2FASlice.reducer;