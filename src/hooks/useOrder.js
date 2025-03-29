// src/hooks/useOrder.js
import { useDispatch, useSelector } from 'react-redux';
import { checkout, fetchOrderStatus, submitFeedback } from '../features/customer/orderThunks';
import { clearOrderError } from '../features/customer/orderSlice';

export const useOrder = () => {
  const dispatch = useDispatch();
  const { currentOrder, orders, loading, error } = useSelector((state) => state.order);

  const handleCheckout = (customerId, paymentMethod, cartId) =>
    dispatch(checkout({ customerId, paymentMethod, cartId }));
  
  const handleFetchOrderStatus = (orderId) => dispatch(fetchOrderStatus(orderId));
  
  const handleSubmitFeedback = (orderId) => dispatch(submitFeedback(orderId));
  
  const resetError = () => dispatch(clearOrderError());

  return {
    currentOrder,
    orders,
    loading,
    error,
    checkout: handleCheckout,
    fetchOrderStatus: handleFetchOrderStatus,
    submitFeedback: handleSubmitFeedback,
    resetError,
  };
};