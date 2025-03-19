import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMerchantProfile,
  updateMerchantProfileThunk,
  updateBusinessHoursThunk,
  updateDeliverySettingsThunk,
  createBranchThunk, // Updated name
  updateBranchThunk, // Updated name
} from './merchantProfileThunks';

const initialState = {
  profile: null,
  branches: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const merchantProfileSlice = createSlice({
  name: 'merchantProfile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchMerchantProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMerchantProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.profile;
        state.branches = action.payload.branches || [];
      })
      .addCase(fetchMerchantProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateMerchantProfileThunk.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload };
        state.status = 'succeeded';
      })
      .addCase(updateMerchantProfileThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Business Hours
      .addCase(updateBusinessHoursThunk.fulfilled, (state, action) => {
        state.profile.businessHours = action.payload.businessHours;
        state.status = 'succeeded';
      })
      .addCase(updateBusinessHoursThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Delivery Settings
      .addCase(updateDeliverySettingsThunk.fulfilled, (state, action) => {
        state.profile.deliverySettings = action.payload.deliverySettings;
        state.status = 'succeeded';
      })
      .addCase(updateDeliverySettingsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create Branch
      .addCase(createBranchThunk.fulfilled, (state, action) => { // Updated name
        state.branches.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createBranchThunk.rejected, (state, action) => { // Updated name
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Branch
      .addCase(updateBranchThunk.fulfilled, (state, action) => { // Updated name
        const index = state.branches.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.branches[index] = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateBranchThunk.rejected, (state, action) => { // Updated name
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = merchantProfileSlice.actions;
export default merchantProfileSlice.reducer;