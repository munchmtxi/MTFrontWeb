import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { assignOrder, confirmPickup, trackDelivery, completeOrder, fetchDriverOrders } from '../../api/driver/driverOrderApi';

export const assignOrderThunk = createAsyncThunk(
  'driverOrders/assignOrder',
  async ({ orderId, driverId }, { rejectWithValue }) => {
    try {
      const response = await assignOrder(orderId, driverId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const confirmPickupThunk = createAsyncThunk(
  'driverOrders/confirmPickup',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await confirmPickup(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const trackDeliveryThunk = createAsyncThunk(
  'driverOrders/trackDelivery',
  async ({ orderId, currentLocation }, { rejectWithValue }) => {
    try {
      const response = await trackDelivery(orderId, currentLocation);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const completeOrderThunk = createAsyncThunk(
  'driverOrders/completeOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await completeOrder(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDriverOrdersThunk = createAsyncThunk(
  'driverOrders/fetchDriverOrders',
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await fetchDriverOrders(driverId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const driverOrderSlice = createSlice({
  name: 'driverOrders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchDriverOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })
      .addCase(assignOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(assignOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to assign order';
      })
      .addCase(confirmPickupThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((order) => order.order_id === action.payload.order_id);
        if (index !== -1) state.orders[index] = { ...state.orders[index], ...action.payload };
      })
      .addCase(trackDeliveryThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((order) => order.order_id === action.payload.order_id);
        if (index !== -1) state.orders[index] = { ...state.orders[index], ...action.payload };
      })
      .addCase(completeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((order) => order.order_id === action.payload.order_id);
        if (index !== -1) state.orders[index] = { ...state.orders[index], ...action.payload };
      });
  },
});

export default driverOrderSlice.reducer;