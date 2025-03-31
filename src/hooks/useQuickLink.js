import { useDispatch, useSelector } from 'react-redux';
import { checkInThunk, callStaffThunk, requestBillThunk, resetError } from '@/features/customer/quickLinkSlice';

const useQuickLink = () => {
  const dispatch = useDispatch();
  const { checkInData, callStaffData, billData, loading, error } = useSelector((state) => state.quickLink);

  const checkIn = (userId, bookingId) => dispatch(checkInThunk({ userId, bookingId }));
  const callStaff = (userId, tableId, requestType) => dispatch(callStaffThunk({ userId, tableId, requestType }));
  const requestBill = (userId, inDiningOrderId, paymentMethod, splitWith) =>
    dispatch(requestBillThunk({ userId, inDiningOrderId, paymentMethod, splitWith }));
  const clearError = () => dispatch(resetError());

  return {
    checkIn,
    callStaff,
    requestBill,
    checkInData,
    callStaffData,
    billData,
    loading,
    error,
    clearError,
  };
};

export default useQuickLink;