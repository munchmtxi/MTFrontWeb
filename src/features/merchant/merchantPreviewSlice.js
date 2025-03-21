import { createSlice } from '@reduxjs/toolkit';
import {
  startPreview,
  updatePreview,
  endPreview,
  getPreview,
} from './merchantPreviewThunks';

const initialState = {
  previewData: null,
  status: 'idle',
  error: null,
};

const merchantPreviewSlice = createSlice({
  name: 'merchantPreview',
  initialState,
  reducers: {
    resetPreviewState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.previewData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startPreview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(startPreview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.previewData = action.payload;
      })
      .addCase(startPreview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updatePreview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePreview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.previewData = action.payload;
      })
      .addCase(updatePreview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(endPreview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(endPreview.fulfilled, (state) => {
        state.status = 'succeeded';
        state.previewData = null;
      })
      .addCase(endPreview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getPreview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPreview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.previewData = action.payload;
      })
      .addCase(getPreview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetPreviewState } = merchantPreviewSlice.actions;
export default merchantPreviewSlice.reducer;