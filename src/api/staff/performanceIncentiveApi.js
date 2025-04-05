import instance from '../axios';

export const getPerformanceMetrics = async (staffId) => {
  try {
    const response = await instance.get(`/api/staff/performance/${staffId}/metrics`);
    return response.data.data; // { completedOrders, closedInDiningOrders, ... }
  } catch (error) {
    console.error('Failed to fetch performance metrics:', error.response?.data || error.message);
    throw error;
  }
};

export const calculateRewards = async (staffId) => {
  try {
    const response = await instance.post(`/api/staff/performance/${staffId}/calculate`);
    return response.data.data.points; // Points earned
  } catch (error) {
    console.error('Failed to calculate rewards:', error.response?.data || error.message);
    throw error;
  }
};

export const assignTier = async (staffId) => {
  try {
    const response = await instance.post(`/api/staff/performance/${staffId}/assign-tier`);
    return response.data.data.tier; // Assigned tier
  } catch (error) {
    console.error('Failed to assign tier:', error.response?.data || error.message);
    throw error;
  }
};

export const redeemRewards = async (staffId, rewardType, pointsToRedeem) => {
  try {
    const response = await instance.post(`/api/staff/performance/${staffId}/redeem`, {
      rewardType,
      pointsToRedeem,
    });
    return response.data.data; // { rewardType, pointsRedeemed, value }
  } catch (error) {
    console.error('Failed to redeem rewards:', error.response?.data || error.message);
    throw error;
  }
};