import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestRide } from '../../api/axios';

export const requestRideAsync = createAsyncThunk(
  'ride/requestRide',
  async ({ pickup, dropoff, rideType }, { rejectWithValue }) => {
    try {
      const response = await requestRide(pickup, dropoff, rideType);
      return response.data.ride; // Extract ride object
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  currentRide: null,
  rideHistory: [],
  tracking: null,
  status: 'idle',
  error: null,
  totalRides: 0,
  pages: 0,
  currentPage: 1,
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    resetRideState: (state) => {
      state.currentRide = null;
      state.tracking = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestRideAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(requestRideAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentRide = action.payload; // Now the ride object directly
      })
      .addCase(requestRideAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetRideState } = rideSlice.actions;
export default rideSlice.reducer;