import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPlacePredictions as getPlacePredictionsApi,
  getPlaceDetails as getPlaceDetailsApi,
  updateMerchantAddress as updateMerchantAddressApi,
} from '../../api/merchant/mapsApi';

export const getPlacePredictions = createAsyncThunk(
  'maps/getPlacePredictions',
  async ({ input, sessionToken }, { rejectWithValue }) => {
    try {
      return await getPlacePredictionsApi(input, sessionToken);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch predictions');
    }
  }
);

export const getPlaceDetails = createAsyncThunk(
  'maps/getPlaceDetails',
  async ({ placeId, sessionToken }, { rejectWithValue }) => {
    try {
      return await getPlaceDetailsApi(placeId, sessionToken);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch place details');
    }
  }
);

export const updateMerchantAddress = createAsyncThunk(
  'maps/updateMerchantAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      return await updateMerchantAddressApi(addressData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update address');
    }
  }
);