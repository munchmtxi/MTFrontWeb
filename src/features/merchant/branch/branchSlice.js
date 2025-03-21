// src/features/merchant/branch/branchSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBranches, createBranch, updateBranch, deleteBranch } from './branchThunks';

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    branches: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Branches
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Branch
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches.push(action.payload);
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Branch
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.branches.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.branches[index] = action.payload;
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Branch
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = state.branches.filter((b) => b.id !== action.payload);
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = branchSlice.actions;
export default branchSlice.reducer;