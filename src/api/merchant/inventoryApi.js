// src/api/merchant/inventoryApi.js
import axios from '../axios';

export const fetchInventoryStats = async (branchId = null) => {
  const url = branchId ? `/api/v1/merchants/inventory/branch/${branchId}/stats` : '/api/v1/merchants/inventory/stats';
  const response = await axios.get(url);
  return response.data.data; // Extract { total_products, tracked_products, etc. }
};