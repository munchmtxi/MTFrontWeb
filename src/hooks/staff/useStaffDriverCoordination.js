import { useDispatch, useSelector } from 'react-redux';
import {
  assignDriverThunk,
  confirmPickupThunk,
  trackDeliveryThunk,
  completeOrderThunk,
  getDriverOrderOverviewThunk,
} from '@features/staff/staffDriverCoordinationThunks'; // Use @features
import { clearError } from '@features/staff/staffDriverCoordinationSlice';

export const useStaffDriverCoordination = () => {
  const dispatch = useDispatch();
  const { orders, tracking, loading, error } = useSelector((state) => state.staffDriverCoordination);

  const assignDriver = (orderId, driverId) => {
    dispatch(assignDriverThunk({ orderId, driverId }));
  };

  const confirmPickup = (orderId, driverToken) => {
    dispatch(confirmPickupThunk({ orderId, driverToken }));
  };

  const trackDelivery = (orderId) => {
    dispatch(trackDeliveryThunk(orderId));
  };

  const completeOrder = (orderId) => {
    dispatch(completeOrderThunk(orderId));
  };

  const getDriverOrderOverview = (branchId) => {
    dispatch(getDriverOrderOverviewThunk(branchId));
  };

  const resetError = () => {
    dispatch(clearError());
  };

  return {
    orders,
    tracking,
    loading,
    error,
    assignDriver,
    confirmPickup,
    trackDelivery,
    completeOrder,
    getDriverOrderOverview,
    resetError,
  };
};