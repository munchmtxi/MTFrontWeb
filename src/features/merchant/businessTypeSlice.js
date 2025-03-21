import { createSlice } from '@reduxjs/toolkit';
import { fetchBusinessType, updateBusinessType } from './businessTypeThunks';

const initialState = {
  businessType: null,
  businessTypeDetails: null,
  loading: false,
  error: null,
};

const businessTypeSlice = createSlice({
  name: 'businessType',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessType.fulfilled, (state, action) => {
        state.loading = false;
        state.businessType = action.payload.business_type;
        state.businessTypeDetails = action.payload.business_type_details;
      })
      .addCase(fetchBusinessType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch business type';
      })
      .addCase(updateBusinessType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBusinessType.fulfilled, (state, action) => {
        state.loading = false;
        state.businessType = action.payload.business_type;
        state.businessTypeDetails = action.payload.business_type_details;
      })
      .addCase(updateBusinessType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update business type';
      });
  },
});

export const { clearError } = businessTypeSlice.actions;
export default businessTypeSlice.reducer;