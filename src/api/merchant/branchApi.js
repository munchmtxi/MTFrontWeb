// src/api/merchant/branchApi.js
import axios from '../axios';

const API_URL = '/api/v1/merchants/branches';

const branchApi = {
  // Fetch all branches for the authenticated merchant
  getBranches: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch branches' };
    }
  },

  // Create a new branch
  createBranch: async (branchData) => {
    try {
      const response = await axios.post(API_URL, branchData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create branch' };
    }
  },

  // Get a specific branch by ID
  getBranchById: async (branchId) => {
    try {
      const response = await axios.get(`${API_URL}/${branchId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch branch' };
    }
  },

  // Update an existing branch
  updateBranch: async (branchId, branchData) => {
    try {
      const response = await axios.patch(`${API_URL}/${branchId}`, branchData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update branch' };
    }
  },

  // Delete a branch
  deleteBranch: async (branchId) => {
    try {
      const response = await axios.delete(`${API_URL}/${branchId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete branch' };
    }
  },

  // Get address predictions (for branch creation/update)
  getAddressPredictions: async (input, sessionToken) => {
    try {
      const response = await axios.get(`${API_URL}/predictions`, {
        params: { input, sessionToken },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch address predictions' };
    }
  },
};

export default branchApi;