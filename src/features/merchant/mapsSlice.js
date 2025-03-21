import { createSlice } from '@reduxjs/toolkit';
import {
  getPlacePredictions,
  getPlaceDetails,
  updateMerchantAddress,
} from './mapsThunks';

const initialState = {
  predictions: [],
  selectedDetails: null,
  merchantAddress: null,
  status: 'idle',
  error: null,
};

const mapsSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    clearPredictions: (state) => {
      state.predictions = [];
    },
    clearSelectedDetails: (state) => {
      state.selectedDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlacePredictions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPlacePredictions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.predictions = action.payload;
      })
      .addCase(getPlacePredictions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getPlaceDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPlaceDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedDetails = action.payload;
      })
      .addCase(getPlaceDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateMerchantAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMerchantAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.merchantAddress = action.payload;
        state.selectedDetails = null; // Clear details after update
        state.predictions = []; // Clear predictions after update
      })
      .addCase(updateMerchantAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearPredictions, clearSelectedDetails } = mapsSlice.actions;
export default mapsSlice.reducer;