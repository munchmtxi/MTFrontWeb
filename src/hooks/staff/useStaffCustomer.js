import { useDispatch, useSelector } from 'react-redux';
import { checkInCustomerThunk, requestAssistanceThunk, processBillThunk } from '@/features/staff/staffCustomerThunks';
import { clearError } from '@/features/staff/staffCustomerSlice';

export const useStaffCustomer = () => {
  const dispatch = useDispatch();
  const { bookings, notifications, orders, loading, error } = useSelector((state) => state.staffCustomer);

  const checkIn = (bookingId) => dispatch(checkInCustomerThunk(bookingId));
  const requestAssistance = (tableId, requestType) =>
    dispatch(requestAssistanceThunk({ tableId, requestType }));
  const processBill = (orderId, paymentMethod, splitWith) =>
    dispatch(processBillThunk({ orderId, paymentMethod, splitWith }));

  const resetError = () => dispatch(clearError());

  return {
    bookings,
    notifications,
    orders,
    loading,
    error,
    checkIn,
    requestAssistance,
    processBill,
    resetError,
  };
};