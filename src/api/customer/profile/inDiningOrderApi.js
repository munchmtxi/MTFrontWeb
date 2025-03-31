import instance from '../../axios';

const MAX_RETRIES = 2;

const inDiningApiCall = async (method, url, data = null, retries = 0) => {
  try {
    const response = await instance[method](url, data);
    return response.data;
  } catch (error) {
    console.error(`In-Dining API call failed (${method} ${url}):`, error.response?.data || error.message);
    if (retries < MAX_RETRIES && error.response?.status >= 500) {
      console.log(`Retrying (${retries + 1}/${MAX_RETRIES})...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (retries + 1))); // Exponential backoff
      return inDiningApiCall(method, url, data, retries + 1);
    }
    throw error;
  }
};

// In-Dining Order Endpoints
export const addItemToOrder = async (orderId, items) =>
  inDiningApiCall('post', `/api/v1/in-dining-orders/${orderId}/items`, { items });

export const updateInDiningOrder = async (orderId, updates) =>
  inDiningApiCall('patch', `/api/v1/in-dining-orders/${orderId}`, updates);

export const closeInDiningOrder = async (orderId) =>
  inDiningApiCall('post', `/api/v1/in-dining-orders/${orderId}/close`);

export const getInDiningOrderStatus = async (orderId) =>
  inDiningApiCall('get', `/api/v1/in-dining-orders/${orderId}/status`);

export const payInDiningOrder = async (orderId, paymentData) =>
  inDiningApiCall('post', `/api/v1/in-dining-orders/${orderId}/pay`, paymentData);

export const getInDiningRecommendations = async (branchId) =>
  inDiningApiCall('get', `/api/v1/in-dining-orders/recommendations?branchId=${branchId}`);

export const addTipToOrder = async (orderId, tipData) =>
  inDiningApiCall('post', `/api/v1/in-dining-orders/${orderId}/tip`, tipData);

export const getActiveBookingSession = async (orderId) =>
  inDiningApiCall('get', `/api/v1/in-dining-orders/${orderId}/session`);

export const addFriendFromSession = async (orderId, friendUserId) =>
  inDiningApiCall('post', `/api/v1/in-dining-orders/${orderId}/friend`, { friendUserId });