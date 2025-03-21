import { createSlice } from '@reduxjs/toolkit';
import {
  addBanner,
  updateBanner,
  deleteBanner,
  getBanner,
  getActiveBanners,
  updateBannerOrder,
} from './bannerThunks';

const initialState = {
  banners: [],
  currentBanner: null,
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Banner
      .addCase(addBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.push(action.payload.data);
      })
      .addCase(addBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add banner';
      })
      // Update Banner
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.banners.findIndex((b) => b.id === action.payload.data.id);
        if (index !== -1) state.banners[index] = action.payload.data;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update banner';
      })
      // Delete Banner
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.filter((b) => b.id !== action.meta.arg);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete banner';
      })
      // Get Banner
      .addCase(getBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBanner = action.payload.data;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch banner';
      })
      // Get Active Banners
      .addCase(getActiveBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })
      .addCase(getActiveBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch active banners';
      })
      // Update Banner Order
      .addCase(updateBannerOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBannerOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBannerOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update banner order';
      });
  },
});

export const { clearError } = bannerSlice.actions;
export default bannerSlice.reducer;