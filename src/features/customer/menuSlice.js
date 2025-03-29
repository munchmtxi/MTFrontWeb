import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenuItems } from '@/api/customer/profile/menuApi.js';

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchMenuItems(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch menu items');
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    merchant: null,
    branch: null,
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetMenuError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.merchant = action.payload.merchant;
        state.branch = action.payload.branch;
        state.items = action.payload.items;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMenuError } = menuSlice.actions;
export default menuSlice.reducer;