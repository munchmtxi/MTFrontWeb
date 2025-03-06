import { createSlice } from '@reduxjs/toolkit';

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState: { location: null, updates: [], error: null },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
      state.error = null;
    },
    addUpdate: (state, action) => {
      state.updates.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLocation, addUpdate, setError } = geolocationSlice.actions;
export default geolocationSlice.reducer;