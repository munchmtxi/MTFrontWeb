import instance from '@api/axios';

export const assignDriver = async (orderId, driverId) => {
  try {
    const response = await instance.post('/api/v1/staff/driver-coordination/assign-driver', {
      orderId,
      driverId,
    });
    console.log('Driver assigned:', response.data);
    return response.data; // { status: 'success', data: { order } }
  } catch (error) {
    console.error('Assign driver failed:', error.response?.data || error.message);
    throw error;
  }
};

export const confirmPickup = async (orderId, driverToken) => {
  try {
    const response = await instance.post('/api/v1/staff/driver-coordination/confirm-pickup', {
      orderId,
      driverToken,
    });
    console.log('Pickup confirmed:', response.data);
    return response.data; // { status: 'success', data: { order } }
  } catch (error) {
    console.error('Confirm pickup failed:', error.response?.data || error.message);
    throw error;
  }
};

export const trackDelivery = async (orderId) => {
  try {
    const response = await instance.get(`/api/v1/staff/driver-coordination/track-delivery/${orderId}`);
    console.log('Delivery tracked:', response.data);
    return response.data; // { status: 'success', data: trackingData }
  } catch (error) {
    console.error('Track delivery failed:', error.response?.data || error.message);
    throw error;
  }
};

export const completeOrder = async (orderId) => {
  try {
    const response = await instance.post('/api/v1/staff/driver-coordination/complete-order', {
      orderId,
    });
    console.log('Order completed:', response.data);
    return response.data; // { status: 'success', data: { order } }
  } catch (error) {
    console.error('Complete order failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getDriverOrderOverview = async (branchId) => {
  try {
    const response = await instance.get(`/api/v1/staff/driver-coordination/driver-overview/${branchId}`);
    console.log('Driver order overview fetched:', response.data);
    return response.data; // { status: 'success', data: { orders, total } }
  } catch (error) {
    console.error('Get driver order overview failed:', error.response?.data || error.message);
    throw error;
  }
};