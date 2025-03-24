// src/features/staff/profile/staffProfileThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import staffProfileApi from '@/api/staff/profile/staffProfileApi';
import { setProfile, setLoading, setError } from './staffProfileSlice';

export const fetchStaffProfile = createAsyncThunk(
  'staffProfile/fetchProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading());
      const response = await staffProfileApi.getProfile();
      dispatch(setProfile(response.data.data));
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch profile';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const updateStaffPersonalInfo = createAsyncThunk(
  'staffProfile/updatePersonalInfo',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading());
      const response = await staffProfileApi.updatePersonalInfo(data);
      dispatch(setProfile(response.data.data));
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update personal info';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);