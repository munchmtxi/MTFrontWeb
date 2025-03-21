import { createSlice } from '@reduxjs/toolkit';
import { fetchActivities, validateActivityChain } from './activityLogThunks';

const initialState = {
  activities: [],
  loading: false,
  error: null,
  validationResult: null,
};

const activityLogSlice = createSlice({
  name: 'activityLog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch activities';
      })
      .addCase(validateActivityChain.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.validationResult = null; // Clear previous result
      })
      .addCase(validateActivityChain.fulfilled, (state, action) => {
        state.loading = false;
        state.validationResult = action.payload.valid
          ? 'Activity chain is valid'
          : `Activity chain is invalid: ${action.payload.reason || 'Unknown issue'}`;
      })
      .addCase(validateActivityChain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to validate activity chain';
      });
  },
});

export const { clearError } = activityLogSlice.actions;
export default activityLogSlice.reducer;