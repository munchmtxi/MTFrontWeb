// src/api/merchant/productApi.js
import axios from '../axios';

export const productApi = {
  createProduct: (productData) => 
    axios.post('/merchant/products', productData),
  
  createDraft: (productData) => 
    axios.post('/merchant/products/draft', productData),
  
  publishDraft: (draftId) => 
    axios.post(`/merchant/products/draft/${draftId}/publish`),
  
  updateProduct: (productId, updateData) => 
    axios.patch(`/merchant/products/${productId}`, updateData),
  
  processBulkUpload: (file, format) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`/merchant/products/bulk-upload?format=${format}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  getProduct: (productId) => 
    axios.get(`/merchant/products/${productId}`),
  
  getProducts: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return axios.get(`/merchant/products?${params}`);
  },
  
  deleteProduct: (productId) => 
    axios.delete(`/merchant/products/${productId}`),
};