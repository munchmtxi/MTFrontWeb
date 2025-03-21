import { createAsyncThunk } from '@reduxjs/toolkit';
import bannerApi from '@/api/merchant/bannerApi';

export const addBanner = createAsyncThunk(
  'banner/addBanner',
  async ({ bannerData, imageFile }, { rejectWithValue }) => {
    try {
      return await bannerApi.addBanner(bannerData, imageFile);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateBanner = createAsyncThunk(
  'banner/updateBanner',
  async ({ bannerId, bannerData, imageFile }, { rejectWithValue }) => {
    try {
      return await bannerApi.updateBanner(bannerId, bannerData, imageFile);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  'banner/deleteBanner',
  async (bannerId, { rejectWithValue }) => {
    try {
      await bannerApi.deleteBanner(bannerId);
      return bannerId; // Return ID for filtering in reducer
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getBanner = createAsyncThunk(
  'banner/getBanner',
  async (bannerId, { rejectWithValue }) => {
    try {
      return await bannerApi.getBanner(bannerId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getActiveBanners = createAsyncThunk(
  'banner/getActiveBanners',
  async (_, { rejectWithValue }) => {
    try {
      return await bannerApi.getActiveBanners();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateBannerOrder = createAsyncThunk(
  'banner/updateBannerOrder',
  async (bannerOrders, { rejectWithValue }) => {
    try {
      return await bannerApi.updateBannerOrder(bannerOrders);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);