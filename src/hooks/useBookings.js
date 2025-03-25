import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableTables, reserveTable } from '../features/customer/bookingThunks';

const useBookings = () => {
  const dispatch = useDispatch();
  const { availableTables, bookings, loading, error } = useSelector((state) => state.booking);

  const getAvailableTables = (params) => {
    dispatch(fetchAvailableTables(params));
  };

  const bookTable = (params) => {
    dispatch(reserveTable(params));
  };

  return {
    availableTables,
    bookings,
    loading,
    error,
    getAvailableTables,
    bookTable,
  };
};

export default useBookings;