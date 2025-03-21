// src/features/merchant/productThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '@/api/merchant/productApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'products/setLoading' });
      const response = await productApi.getProducts(filters);
      dispatch({ type: 'products/setProducts', payload: response.data });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch products';
      dispatch({ type: 'products/setError', payload: errorMessage });
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'products/setLoading' });
      const response = await productApi.getProduct(productId);
      dispatch({ type: 'products/setCurrentProduct', payload: response.data.data });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch product';
      dispatch({ type: 'products/setError', payload: errorMessage });
      return rejectWithValue(errorMessage);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'products/setLoading' });
      const response = await productApi.createProduct(productData);
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create product';
      dispatch({ type: 'products/setError', payload: errorMessage });
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updateData }, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'products/setLoading' });
      const response = await productApi.updateProduct(productId, updateData);
      dispatch({ type: 'products/setCurrentProduct', payload: response.data.data });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update product';
      dispatch({ type: 'products/setError', payload: errorMessage });
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'products/setLoading' });
      await productApi.deleteProduct(productId);
      return productId;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete product';
      dispatch({ type: 'products/setError', payload: errorMessage });
      return rejectWithValue(errorMessage);
    }
  }
);

export const processBulkUpload = createAsyncThunk(
  'products/processBulkUpload',
  async ({ file, format }, { dispatch, rejectWithValue }) => {
    try {
      dispatch({ type: 'products/setLoading' });
      const response = await productApi.processBulkUpload(file, format);
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to process bulk upload';
      dispatch({ type: 'products/setError', payload: errorMessage });
      return rejectWithValue(errorMessage);
    }
  }
);