import axios from '../../axios'; // Corrected path to src/api/axios.js

// Add an item to the cart
export const addItemToCart = async (menuItemId, quantity, customizations = {}) => {
  try {
    const response = await axios.post('/api/customer/cart/items', {
      menuItemId,
      quantity,
      customizations,
    });
    return response.data; // { status: "success", data: { id, items, subtotal, ... } }
  } catch (error) {
    console.error('Add item to cart failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Fetch the current cart
export const fetchCart = async () => {
  try {
    const response = await axios.get('/api/customer/cart');
    return response.data; // { status: "success", data: { id, items, subtotal, ... } }
  } catch (error) {
    console.error('Fetch cart failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Update a cart item
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await axios.patch(`/api/customer/cart/items/${cartItemId}`, {
      quantity,
    });
    return response.data; // { status: "success", data: { id, items, subtotal, ... } }
  } catch (error) {
    console.error('Update cart item failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Remove an item from the cart
export const removeCartItem = async (cartItemId, saveForLater = false) => {
  try {
    const response = await axios.delete(`/api/customer/cart/items/${cartItemId}`, {
      data: { saveForLater },
    });
    return response.data; // { status: "success", data: { id, items, subtotal, ... } }
  } catch (error) {
    console.error('Remove cart item failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Clear the cart
export const clearCart = async () => {
  try {
    const response = await axios.delete('/api/customer/cart');
    return response.data; // { status: "success", data: null }
  } catch (error) {
    console.error('Clear cart failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Fetch available menu items (merchant products)
export const fetchMenuItems = async () => {
  try {
    const response = await axios.get('/api/merchant/menu'); // Adjust endpoint as needed
    return response.data; // { status: "success", data: [{ id, name, price, ... }, ...] }
  } catch (error) {
    console.error('Fetch menu items failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};