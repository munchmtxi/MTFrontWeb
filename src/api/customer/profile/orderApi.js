// src/api/customer/profile/orderApi.js
import axios from '../../axios';

export const checkoutOrder = async (customerId, paymentMethod, cartId) => {
  try {
    const response = await axios.post('/api/customer/checkout', {
      customer_id: customerId,
      payment_method: paymentMethod,
      cart_id: cartId,
    });
    return response.data.data; // { order_id, order_number, status, total_amount }
  } catch (error) {
    console.error('Checkout failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getOrderStatus = async (orderId) => {
  try {
    const response = await axios.get(`/api/customer/order/${orderId}/status`);
    return response.data.data; // { order_id, status, estimated_delivery_time, etc. }
  } catch (error) {
    console.error('Get order status failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const requestFeedback = async (orderId) => {
  try {
    const response = await axios.post('/api/customer/order/request-feedback', { order_id: orderId });
    return response.data.data; // { order_id, status }
  } catch (error) {
    console.error('Feedback request failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};