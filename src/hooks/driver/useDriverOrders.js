import { useDispatch, useSelector } from 'react-redux';
import {
  assignOrderThunk,
  confirmPickupThunk,
  trackDeliveryThunk,
  completeOrderThunk,
  fetchDriverOrdersThunk,
} from '../../features/driver/driverOrderSlice';
import { useEffect } from 'react';

const useDriverOrders = (driverId) => {
  const dispatch = useDispatch();
  const driverOrders = useSelector((state) => state.driverOrders) || { orders: [], loading: false, error: null };
  const { orders, loading, error } = driverOrders;

  useEffect(() => {
    if (driverId) {
      dispatch(fetchDriverOrdersThunk(driverId));
    }
  }, [dispatch, driverId]);

  const assignOrder = (orderId) => dispatch(assignOrderThunk({ orderId, driverId }));
  const confirmPickup = (orderId) => dispatch(confirmPickupThunk(orderId));
  const trackDelivery = (orderId, currentLocation) => dispatch(trackDeliveryThunk({ orderId, currentLocation }));
  const completeOrder = (orderId) => dispatch(completeOrderThunk(orderId));

  return {
    orders,
    loading,
    error,
    assignOrder,
    confirmPickup,
    trackDelivery,
    completeOrder,
    fetchOrders: () => dispatch(fetchDriverOrdersThunk(driverId)),
  };
};

export default useDriverOrders;