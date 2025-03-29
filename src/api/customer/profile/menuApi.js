import axios from '@/api/axios.js';

export const fetchMenuItems = async ({ merchantId, branchId, categoryId } = {}) => {
  try {
    const response = await axios.get('/api/merchant/menu', {
      params: { merchantId, branchId, categoryId },
    });
    console.log('Menu items fetched:', response.data);
    return response.data; // { status: 'success', data: { merchant, branch, items } }
  } catch (error) {
    console.error('Failed to fetch menu items:', error.response?.data || error.message);
    throw error;
  }
};