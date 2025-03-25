import bookingApi from '../../api/customer/profile/booking/bookingApi';
import { setAvailableTables, setLoading, setError, addBooking } from './bookingSlice';

export const fetchAvailableTables = ({ branchId, bookingDate, bookingTime }) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await bookingApi.getAvailableTables({ branchId, bookingDate, bookingTime });
    dispatch(setAvailableTables(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch available tables'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const reserveTable = ({ merchantId, branchId, tableId, bookingDate, bookingTime, guestCount }) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await bookingApi.reserveTable({
      merchantId,
      branchId,
      tableId,
      bookingDate,
      bookingTime,
      guestCount,
    });
    dispatch(addBooking(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to reserve table'));
  } finally {
    dispatch(setLoading(false));
  }
};