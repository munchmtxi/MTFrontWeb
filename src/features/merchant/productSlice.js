// src/features/merchant/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  currentProduct: null,
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setProducts, setCurrentProduct, setLoading, setError, clearError } = productSlice.actions;
export default productSlice.reducer;