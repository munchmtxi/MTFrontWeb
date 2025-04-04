import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'offline',
  availableStaff: [],
  loading: false,
  error: null,
};

const staffAvailabilitySlice = createSlice({
  name: 'staffAvailability',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setAvailableStaff: (state, action) => {
      state.availableStaff = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStatus, setAvailableStaff, setLoading, setError } = staffAvailabilitySlice.actions;
export default staffAvailabilitySlice.reducer;