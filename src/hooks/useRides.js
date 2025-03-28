import { useDispatch, useSelector } from 'react-redux';
import {
  requestRide,
  processPayment,
  scheduleRide,
  getRideHistory,
  trackRide,
  updateRideStatus,
} from '../features/customer/rideThunks';
import { resetRideState } from '../features/customer/rideSlice'; // Added this

const useRides = () => {
  const dispatch = useDispatch();
  const { currentRide, rideHistory, tracking, status, error, totalRides, pages, currentPage } = useSelector(
    (state) => state.ride
  );

  const handleRequestRide = (rideData) => dispatch(requestRide(rideData));
  const handleProcessPayment = (rideId, paymentDetails) => dispatch(processPayment({ rideId, paymentDetails }));
  const handleScheduleRide = (rideId, scheduleTime) => dispatch(scheduleRide({ rideId, scheduleTime }));
  const handleGetRideHistory = (params) => dispatch(getRideHistory(params));
  const handleTrackRide = (rideId) => dispatch(trackRide(rideId));
  const handleUpdateRideStatus = (rideId, status) => dispatch(updateRideStatus({ rideId, status }));
  const handleResetRideState = () => dispatch(resetRideState());

  return {
    currentRide,
    rideHistory,
    tracking,
    status,
    error,
    totalRides,
    pages,
    currentPage,
    requestRide: handleRequestRide,
    processPayment: handleProcessPayment,
    scheduleRide: handleScheduleRide,
    getRideHistory: handleGetRideHistory,
    trackRide: handleTrackRide,
    updateRideStatus: handleUpdateRideStatus,
    resetRideState: handleResetRideState,
  };
};

export default useRides;