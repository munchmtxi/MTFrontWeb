import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubscriptions,
  createSubscription,
  updateSubscription,
  cancelSubscription,
} from '@/features/customer/subscriptionThunks';
import { resetError } from '@/features/customer/subscriptionSlice';

export const useSubscription = () => {
  const dispatch = useDispatch();
  const { subscriptions, loading, error } = useSelector((state) => state.subscription);

  const fetchSubscriptionsList = () => dispatch(fetchSubscriptions());
  const createNewSubscription = (data) => dispatch(createSubscription(data));
  const updateExistingSubscription = (subscriptionId, data) =>
    dispatch(updateSubscription({ subscriptionId, data }));
  const cancelExistingSubscription = (subscriptionId, reason) =>
    dispatch(cancelSubscription({ subscriptionId, reason }));
  const clearError = () => dispatch(resetError());

  return {
    subscriptions,
    loading,
    error,
    fetchSubscriptions: fetchSubscriptionsList,
    createSubscription: createNewSubscription,
    updateSubscription: updateExistingSubscription,
    cancelSubscription: cancelExistingSubscription,
    resetError: clearError,
  };
};