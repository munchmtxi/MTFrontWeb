import instance from '../axios';

export const assignOrder = async (orderId, driverId) => {
  try {
    const response = await instance.post(`/api/v1/driver/orders/assign/${orderId}`, { driver_id: driverId });
    return response.data;
  } catch (error) {
    console.error('Assign order failed:', error.response?.data || error.message);
    throw error;
  }
};

export const confirmPickup = async (orderId) => {
  try {
    const response = await instance.put(`/api/v1/driver/orders/pickup/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Confirm pickup failed:', error.response?.data || error.message);
    throw error;
  }
};

export const trackDelivery = async (orderId, currentLocation) => {
  try {
    const response = await instance.put(`/api/v1/driver/orders/track/${orderId}`, { current_location: currentLocation });
    return response.data;
  } catch (error) {
    console.error('Track delivery failed:', error.response?.data || error.message);
    throw error;
  }
};

export const completeOrder = async (orderId) => {
  try {
    const response = await instance.put(`/api/v1/driver/orders/complete/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Complete order failed:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchDriverOrders = async (driverId) => {
  try {
    const response = await instance.get(`/api/v1/driver/orders?driver_id=${driverId}`);
    return response.data;
  } catch (error) {
    console.error('Fetch driver orders failed:', error.response?.data || error.message);
    throw error;
  }
};