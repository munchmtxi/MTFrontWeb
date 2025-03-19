import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getApiMerchantProfile,
  updateMerchantProfile,
  updateBusinessHours,
  updateDeliverySettings,
  createBranch,
  updateBranch,
} from '@/api/merchant/merchantApi';

export const fetchMerchantProfile = createAsyncThunk(
  'merchantProfile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      // Force fresh data by adding a cache-busting header
      const response = await getApiMerchantProfile({ headers: { 'Cache-Control': 'no-cache' } });
      console.log('fetchMerchantProfile Response:', response); // Log full response
      const data = response.data;
      // Transform flat response into expected structure
      const payload = {
        profile: {
          id: data.id,
          businessName: data.business_name,
          business_type: data.business_type,
          address: data.address,
          phone_number: data.phone_number,
          currency: data.currency,
          time_zone: data.time_zone,
          business_hours: data.business_hours,
          whatsapp_enabled: data.whatsapp_enabled,
          // Add other fields as needed
        },
        branches: data.branches || [], // Use branches if included, else empty array
      };
      console.log('fetchMerchantProfile Payload:', payload); // Log transformed payload
      return payload;
    } catch (error) {
      console.error('fetchMerchantProfile Error:', error.response || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// ... (rest of the file remains unchanged)
export const updateMerchantProfileThunk = createAsyncThunk(
  'merchantProfile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updateMerchantProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const updateBusinessHoursThunk = createAsyncThunk(
  'merchantProfile/updateBusinessHours',
  async (hoursData, { rejectWithValue }) => {
    try {
      const response = await updateBusinessHours(hoursData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update business hours');
    }
  }
);

export const updateDeliverySettingsThunk = createAsyncThunk(
  'merchantProfile/updateDeliverySettings',
  async (settingsData, { rejectWithValue }) => {
    try {
      const response = await updateDeliverySettings(settingsData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update delivery settings');
    }
  }
);

export const createBranchThunk = createAsyncThunk(
  'merchantProfile/createBranch',
  async (branchData, { rejectWithValue }) => {
    try {
      const response = await createBranch(branchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create branch');
    }
  }
);

export const updateBranchThunk = createAsyncThunk(
  'merchantProfile/updateBranch',
  async ({ branchId, branchData }, { rejectWithValue }) => {
    try {
      const response = await updateBranch(branchId, branchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update branch');
    }
  }
);