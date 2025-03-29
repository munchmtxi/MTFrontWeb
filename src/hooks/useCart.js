import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCartThunk,
  fetchCartThunk,
  updateCartItemThunk,
  removeCartItemThunk,
  clearCartThunk,
  fetchMenuItemsThunk,
} from '../features/customer/cartThunks';
import { resetCartError } from '../features/customer/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { cart, menuItems, loading, error } = useSelector((state) => state.cart);

  const addItem = (menuItemId, quantity, customizations = {}) =>
    dispatch(addItemToCartThunk({ menuItemId, quantity, customizations }));

  const fetchCart = () => dispatch(fetchCartThunk());

  const updateItem = (cartItemId, quantity) =>
    dispatch(updateCartItemThunk({ cartItemId, quantity }));

  const removeItem = (cartItemId, saveForLater = false) =>
    dispatch(removeCartItemThunk({ cartItemId, saveForLater }));

  const clearCart = () => dispatch(clearCartThunk());

  const fetchMenuItems = () => dispatch(fetchMenuItemsThunk());

  const resetError = () => dispatch(resetCartError());

  return {
    cart,
    menuItems,
    loading,
    error,
    addItem,
    fetchCart,
    updateItem,
    removeItem,
    clearCart,
    fetchMenuItems,
    resetError,
  };
};