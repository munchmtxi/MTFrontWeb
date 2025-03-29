import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addItemToCart,
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  fetchMenuItems,
} from '../../api/customer/profile/cartApi'; // Corrected path

// Add Item to Cart
export const addItemToCartThunk = createAsyncThunk(
  'cart/addItem',
  async ({ menuItemId, quantity, customizations }, { rejectWithValue }) => {
    try {
      const response = await addItemToCart(menuItemId, quantity, customizations);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Fetch Cart
export const fetchCartThunk = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCart();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update Cart Item
export const updateCartItemThunk = createAsyncThunk(
  'cart/updateItem',
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(cartItemId, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Remove Cart Item
export const removeCartItemThunk = createAsyncThunk(
  'cart/removeItem',
  async ({ cartItemId, saveForLater }, { rejectWithValue }) => {
    try {
      const response = await removeCartItem(cartItemId, saveForLater);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Clear Cart
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCart();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Fetch Menu Items
export const fetchMenuItemsThunk = createAsyncThunk(
  'cart/fetchMenuItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMenuItems();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);