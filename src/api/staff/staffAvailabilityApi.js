import axios from '@/api/axios';

export const setAvailabilityStatus = async (status) => {
  try {
    const response = await axios.post('/api/v1/staff/availability', { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const assignStaffToEntity = async (entityId, entityType) => {
  try {
    const response = await axios.post('/api/v1/staff/assign', { entityId, entityType });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAvailableStaff = async (branchId, bookingDate, bookingTime) => {
  try {
    const response = await axios.get('/api/v1/staff/available', {
      params: { branchId, bookingDate, bookingTime },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};