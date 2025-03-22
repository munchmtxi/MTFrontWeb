// src/features/merchant/inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchInventoryStatsThunk } from './inventoryThunks';

const initialState = {
  stats: {
    total_products: 0,
    tracked_products: 0,
    out_of_stock_products: 0,
    low_stock_products: 0,
    inventory_value: 0,
  },
  branchId: null, // Track which branch the stats are for
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setBranchId: (state, action) => {
      state.branchId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.branchId = action.payload.branchId;
      })
      .addCase(fetchInventoryStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch inventory stats';
      });
  },
});

export const { setBranchId } = inventorySlice.actions;
export default inventorySlice.reducer;