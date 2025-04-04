import { useDispatch, useSelector } from 'react-redux';
import { updateAvailabilityStatus, assignStaff, fetchAvailableStaff } from '@/features/staff/staffAvailabilityThunks';

export const useStaffAvailability = () => {
  const dispatch = useDispatch();
  const { status, availableStaff, loading, error } = useSelector((state) => state.staffAvailability);

  const setAvailability = (newStatus) => dispatch(updateAvailabilityStatus(newStatus));
  const assignToEntity = (entityId, entityType) => dispatch(assignStaff({ entityId, entityType }));
  const getStaffAvailability = (branchId, bookingDate, bookingTime) =>
    dispatch(fetchAvailableStaff({ branchId, bookingDate, bookingTime }));

  return {
    status,
    availableStaff,
    loading,
    error,
    setAvailability,
    assignToEntity,
    getStaffAvailability,
  };
};