import instance from '../axios';

export const checkInCustomer = async (bookingId) => {
  try {
    const response = await instance.post(`/api/v1/staff/customer/check-in/${bookingId}`);
    return response.data; // { status: 'success', data: { booking } }
  } catch (error) {
    console.error('Check-in failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const requestAssistance = async (tableId, requestType) => {
  try {
    const response = await instance.post('/api/v1/staff/customer/assistance', { tableId, requestType });
    return response.data; // { status: 'success', data: { notification } }
  } catch (error) {
    console.error('Assistance request failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const processBill = async (orderId, paymentMethod, splitWith = []) => {
  try {
    const response = await instance.post(`/api/v1/staff/customer/bill/${orderId}`, { paymentMethod, splitWith });
    return response.data; // { status: 'success', data: { order } }
  } catch (error) {
    console.error('Bill processing failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};