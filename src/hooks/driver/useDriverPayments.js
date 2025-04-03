import { useDispatch, useSelector } from 'react-redux';
import {
  addTip,
  fetchEarnings,
  requestPayout,
  resetPaymentState,
} from '@features/driver/driverPaymentSlice'; // Correct path

const useDriverPayments = () => {
  const dispatch = useDispatch();
  const { earnings, lastTipPayment, lastPayout, status, error } = useSelector(
    (state) => state.driverPayment
  );

  const handleAddTip = (paymentId, tipData) => {
    dispatch(addTip({ paymentId, tipData }));
  };

  const handleFetchEarnings = () => {
    dispatch(fetchEarnings());
  };

  const handleRequestPayout = (amount) => {
    dispatch(requestPayout(amount));
  };

  const resetState = () => {
    dispatch(resetPaymentState());
  };

  return {
    earnings,
    lastTipPayment,
    lastPayout,
    status,
    error,
    addTip: handleAddTip,
    fetchEarnings: handleFetchEarnings,
    requestPayout: handleRequestPayout,
    resetState,
  };
};

export default useDriverPayments;