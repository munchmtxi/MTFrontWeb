// src/features/driver/driverRideSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  matchDriverToRide,
  acceptRide,
  completeRide,
  updateDriverLocation,
  getActiveRide,
} from '../../api/driver/driverRideApi';

export const fetchActiveRide = createAsyncThunk('driverRide/fetchActiveRide', async (_, { rejectWithValue }) => {
  try {
    return await getActiveRide();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch active ride');
  }
});

export const updateLocation = createAsyncThunk('driverRide/updateLocation', async (location, { rejectWithValue }) => {
  try {
    return await updateDriverLocation(location);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update location');
  }
});

export const acceptRideThunk = createAsyncThunk('driverRide/acceptRide', async (rideId, { rejectWithValue }) => {
  try {
    return await acceptRide(rideId);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to accept ride');
  }
});

export const completeRideThunk = createAsyncThunk('driverRide/completeRide', async (rideId, { rejectWithValue }) => {
  try {
    return await completeRide(rideId);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to complete ride');
  }
});

const driverRideSlice = createSlice({
  name: 'driverRide',
  initialState: {
    activeRide: null,
    driverLocation: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setActiveRideFromSocket: (state, action) => {
      state.activeRide = action.payload;
      state.status = 'succeeded';
    },
    setLocationFromSocket: (state, action) => {
      state.driverLocation = action.payload;
    },
    clearRide: (state) => {
      state.activeRide = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveRide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActiveRide.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeRide = action.payload;
      })
      .addCase(fetchActiveRide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.driverLocation = action.payload.driver.current_location;
      })
      .addCase(acceptRideThunk.fulfilled, (state, action) => {
        state.activeRide = action.payload.ride;
      })
      .addCase(completeRideThunk.fulfilled, (state) => {
        state.activeRide = null;
        state.status = 'idle';
      });
  },
});

export const { setActiveRideFromSocket, setLocationFromSocket, clearRide } = driverRideSlice.actions;
export default driverRideSlice.reducer;