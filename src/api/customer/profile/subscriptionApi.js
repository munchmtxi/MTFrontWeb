import instance from '@/api/axios';

const subscriptionApi = {
  // Fetch all subscriptions for the customer
  getSubscriptions: async () => {
    const response = await instance.get('/api/v1/subscriptions');
    return response.data;
  },

  // Create a new subscription
  createSubscription: async (data) => {
    const response = await instance.post('/api/v1/subscriptions', data);
    return response.data;
  },

  // Update an existing subscription
  updateSubscription: async (subscriptionId, data) => {
    const response = await instance.patch(`/api/v1/subscriptions/${subscriptionId}`, data);
    return response.data;
  },

  // Cancel a subscription
  cancelSubscription: async (subscriptionId, reason) => {
    const response = await instance.delete(`/api/v1/subscriptions/${subscriptionId}`, {
      data: { reason },
    });
    return response.data;
  },
};

export default subscriptionApi;