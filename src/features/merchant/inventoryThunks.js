// src/features/merchant/inventoryThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInventoryStats } from '../../api/merchant/inventoryApi';

export const fetchInventoryStatsThunk = createAsyncThunk(
  'inventory/fetchStats',
  async (branchId = null, { rejectWithValue }) => {
    try {
      const stats = await fetchInventoryStats(branchId);
      return { stats, branchId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);