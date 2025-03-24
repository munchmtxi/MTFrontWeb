// src/features/staff/profile/staffProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const staffProfileSlice = createSlice({
  name: 'staffProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProfile, setLoading, setError } = staffProfileSlice.actions;
export default staffProfileSlice.reducer;