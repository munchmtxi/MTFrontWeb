import { createSlice } from '@reduxjs/toolkit';
import {
  createOrUpdateDraft,
  getDraft,
  submitDraft,
} from './draftThunks';

const initialState = {
  draft: null,
  status: 'idle',
  error: null,
};

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrUpdateDraft.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrUpdateDraft.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.draft = action.payload;
      })
      .addCase(createOrUpdateDraft.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getDraft.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDraft.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.draft = action.payload;
      })
      .addCase(getDraft.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(submitDraft.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitDraft.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.draft = action.payload;
      })
      .addCase(submitDraft.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default draftSlice.reducer;