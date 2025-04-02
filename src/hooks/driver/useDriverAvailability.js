import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAvailability,
  toggleOnlineStatus,
  setDriverShift,
  simulateAvailability,
  fetchDeviceStatus,
} from '@/features/driver/driverAvailabilitySlice';

const useDriverAvailability = (driverId) => {
  const dispatch = useDispatch();
  const { availability, deviceStatus, isOnline, loading, error } = useSelector(
    (state) => state.driverAvailability
  );

  const getAvailability = () => dispatch(fetchAvailability(driverId));
  const toggleStatus = (isOnline) => dispatch(toggleOnlineStatus({ driverId, isOnline }));
  const setShift = (shiftData) => dispatch(setDriverShift({ driverId, shiftData }));
  const simulate = () => dispatch(simulateAvailability(driverId));
  const getDeviceStatus = () => dispatch(fetchDeviceStatus(driverId));

  return {
    availability,
    deviceStatus,
    isOnline,
    loading,
    error,
    getAvailability,
    toggleStatus,
    setShift,
    simulate,
    getDeviceStatus,
  };
};

export default useDriverAvailability;