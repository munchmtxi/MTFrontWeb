import instance from '../../axios';

const MAX_RETRIES = 2;

const friendApiCall = async (method, url, data = null, retries = 0) => {
  try {
    const response = await instance[method](url, data);
    return response.data;
  } catch (error) {
    console.error(`Friend API call failed (${method} ${url}):`, error.response?.data || error.message);
    if (retries < MAX_RETRIES && error.response?.status >= 500) {
      console.log(`Retrying (${retries + 1}/${MAX_RETRIES})...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (retries + 1)));
      return friendApiCall(method, url, data, retries + 1);
    }
    throw error;
  }
};

// Friend Endpoints
export const sendFriendRequest = async (friendId) =>
  friendApiCall('post', '/api/v1/friends/request', { friendId });

export const acceptFriendRequest = async (requestId) =>
  friendApiCall('patch', `/api/v1/friends/request/${requestId}/accept`);

export const rejectFriendRequest = async (requestId) =>
  friendApiCall('patch', `/api/v1/friends/request/${requestId}/reject`);

export const getFriendsList = async () =>
  friendApiCall('get', '/api/v1/friends');