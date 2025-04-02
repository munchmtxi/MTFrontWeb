import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import driverAvailabilityApi from '@/api/driver/driverAvailabilityApi';

// Async thunks
export const fetchAvailability = createAsyncThunk(
  'driverAvailability/fetchAvailability',
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await driverAvailabilityApi.getAvailability(driverId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch availability');
    }
  }
);

export const toggleOnlineStatus = createAsyncThunk(
  'driverAvailability/toggleOnlineStatus',
  async ({ driverId, isOnline }, { rejectWithValue }) => {
    try {
      const response = await driverAvailabilityApi.toggleStatus(driverId, isOnline);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to toggle status');
    }
  }
);

export const setDriverShift = createAsyncThunk(
  'driverAvailability/setDriverShift',
  async ({ driverId, shiftData }, { rejectWithValue }) => {
    try {
      const response = await driverAvailabilityApi.setShift(driverId, shiftData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to set shift');
    }
  }
);

export const simulateAvailability = createAsyncThunk(
  'driverAvailability/simulateAvailability',
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await driverAvailabilityApi.simulateAvailability(driverId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to simulate availability');
    }
  }
);

export const fetchDeviceStatus = createAsyncThunk(
  'driverAvailability/fetchDeviceStatus',
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await driverAvailabilityApi.getDeviceStatus(driverId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch device status');
    }
  }
);

const driverAvailabilitySlice = createSlice({
  name: 'driverAvailability',
  initialState: {
    availability: null,
    deviceStatus: null,
    isOnline: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Availability
      .addCase(fetchAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
        state.isOnline = action.payload.isOnline;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Online Status
      .addCase(toggleOnlineStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleOnlineStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isOnline = action.payload.isOnline;
        state.availability = { ...state.availability, isOnline: action.payload.isOnline };
      })
      .addCase(toggleOnlineStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Set Driver Shift
      .addCase(setDriverShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDriverShift.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload.availability;
        state.isOnline = true; // Shift sets driver online
      })
      .addCase(setDriverShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Simulate Availability
      .addCase(simulateAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(simulateAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.isOnline = action.payload.isOnline;
        state.availability = { ...state.availability, isOnline: action.payload.isOnline };
      })
      .addCase(simulateAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Device Status
      .addCase(fetchDeviceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeviceStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.deviceStatus = action.payload;
      })
      .addCase(fetchDeviceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default driverAvailabilitySlice.reducer;