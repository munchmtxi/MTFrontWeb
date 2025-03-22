import { createAsyncThunk } from '@reduxjs/toolkit';
import reservationApi from '../../../api/merchant/reservationApi';

export const fetchBookings = createAsyncThunk(
  'reservation/fetchBookings',
  async ({ branchId, filters }, { rejectWithValue }) => {
    try {
      return await reservationApi.getBookings(branchId, filters);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'reservation/fetchBookingById',
  async (bookingId, { rejectWithValue }) => {
    try {
      return await reservationApi.getBookingById(bookingId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  'reservation/createBooking',
  async ({ branchId, bookingData }, { rejectWithValue }) => {
    try {
      return await reservationApi.createBooking(branchId, bookingData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);