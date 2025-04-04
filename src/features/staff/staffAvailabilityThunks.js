import { createAsyncThunk } from '@reduxjs/toolkit';
import { setStatus, setAvailableStaff, setLoading, setError } from './staffAvailabilitySlice';
import { setAvailabilityStatus, assignStaffToEntity, getAvailableStaff } from '@/api/staff/staffAvailabilityApi';

export const updateAvailabilityStatus = createAsyncThunk(
  'staffAvailability/updateStatus',
  async (status, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await setAvailabilityStatus(status);
      dispatch(setStatus(response.data.staff.availability_status));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const assignStaff = createAsyncThunk(
  'staffAvailability/assignStaff',
  async ({ entityId, entityType }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await assignStaffToEntity(entityId, entityType);
      dispatch(setStatus('busy'));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchAvailableStaff = createAsyncThunk(
  'staffAvailability/fetchAvailableStaff',
  async ({ branchId, bookingDate, bookingTime }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await getAvailableStaff(branchId, bookingDate, bookingTime);
      dispatch(setAvailableStaff(response.data.staff));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);