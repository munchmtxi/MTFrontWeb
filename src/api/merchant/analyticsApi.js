import axiosInstance from '../axios';

export const fetchAnalyticsSummary = async (merchantId, period = '24h') => {
  const response = await axiosInstance.get(`/api/v1/merchants/${merchantId}/analytics/summary`, {
    params: { period },
  });
  return response.data.data;
};

export const fetchActiveViewers = async (merchantId) => {
  const response = await axiosInstance.get(`/api/v1/merchants/${merchantId}/analytics/active-viewers`);
  return response.data.data;
};

export const fetchDetailedAnalytics = async (merchantId, filters = {}) => {
  const response = await axiosInstance.get(`/api/v1/merchants/${merchantId}/analytics/detailed`, {
    params: filters,
  });
  return response.data.data;
};