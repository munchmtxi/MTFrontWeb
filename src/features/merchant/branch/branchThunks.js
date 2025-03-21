// src/features/merchant/branch/branchThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import branchApi from '@/api/merchant/branchApi';

export const fetchBranches = createAsyncThunk('branch/fetchBranches', async (_, { rejectWithValue }) => {
  try {
    const response = await branchApi.getBranches();
    return response.data; // Extract the data field
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch branches');
  }
});

export const createBranch = createAsyncThunk('branch/createBranch', async (branchData, { rejectWithValue }) => {
  try {
    const response = await branchApi.createBranch(branchData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to create branch');
  }
});

export const updateBranch = createAsyncThunk('branch/updateBranch', async ({ branchId, branchData }, { rejectWithValue }) => {
  try {
    const response = await branchApi.updateBranch(branchId, branchData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to update branch');
  }
});

export const deleteBranch = createAsyncThunk('branch/deleteBranch', async (branchId, { rejectWithValue }) => {
  try {
    await branchApi.deleteBranch(branchId);
    return branchId; // Return the ID for filtering in the reducer
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to delete branch');
  }
});