import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPerformanceMetrics,
  calculatePerformanceRewards,
  assignPerformanceTier,
  redeemPerformanceRewards,
} from '../../features/staff/performanceIncentiveThunks';
import { resetPerformance } from '../../features/staff/performanceIncentiveSlice'; // Import from slice

export const usePerformanceIncentive = () => {
  const dispatch = useDispatch();
  const { metrics, points, tier, redemptionHistory, loading, error } = useSelector(
    (state) => state.performanceIncentive
  );

  const getMetrics = (staffId) => dispatch(fetchPerformanceMetrics(staffId));
  const calculate = (staffId) => dispatch(calculatePerformanceRewards(staffId));
  const assign = (staffId) => dispatch(assignPerformanceTier(staffId));
  const redeem = (staffId, rewardType, pointsToRedeem) =>
    dispatch(redeemPerformanceRewards({ staffId, rewardType, pointsToRedeem }));
  const reset = () => dispatch(resetPerformance());

  return {
    metrics,
    points,
    tier,
    redemptionHistory,
    loading,
    error,
    getMetrics,
    calculate,
    assign,
    redeem,
    reset,
  };
};