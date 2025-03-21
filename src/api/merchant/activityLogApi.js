import axiosInstance from '@/api/axios'; // Updated from '@/axios'

const activityLogApi = {
  fetchActivities: async (merchantId, options = {}) => {
    const { startDate, endDate, eventTypes, limit = 50, offset = 0 } = options;
    const params = {
      startDate,
      endDate,
      eventTypes: eventTypes ? eventTypes.join(',') : undefined,
      limit,
      offset,
    };
    const response = await axiosInstance.get(`/api/v1/merchants/${merchantId}/profile/activity`, { params });
    return response.data;
  },

  validateActivityChain: async (merchantId) => {
    const response = await axiosInstance.get(`/api/v1/merchants/${merchantId}/profile/activity/validate`);
    return response.data;
  },

  logActivity: async (merchantId, activityData) => {
    const response = await axiosInstance.post(`/api/v1/merchants/${merchantId}/profile/activity/log`, activityData);
    return response.data;
  },
};

export default activityLogApi;