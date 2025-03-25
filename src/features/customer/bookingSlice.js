import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    availableTables: [],
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAvailableTables: (state, action) => {
      state.availableTables = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAvailableTables, addBooking, setLoading, setError } = bookingSlice.actions;
export default bookingSlice.reducer;