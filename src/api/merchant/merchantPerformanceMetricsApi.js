import axiosInstance from '../axios';

export const getPerformanceMetrics = async ({ periodType, startDate, endDate }) => {
  const response = await axiosInstance.get('/api/merchant/profile/performance-metrics', {
    params: { periodType, startDate, endDate },
  });
  return response.data.data;
};

export const updateMetricsForOrder = async (orderId) => {
  const response = await axiosInstance.post('/api/merchant/profile/performance-metrics/update-order', { orderId });
  return response.data;
};

export const recalculateMetrics = async ({ periodType, startDate, endDate }) => {
  const response = await axiosInstance.post('/api/merchant/profile/performance-metrics/recalculate', {
    periodType,
    startDate,
    endDate,
  });
  return response.data.data;
};