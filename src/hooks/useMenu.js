import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, resetMenuError } from '@/features/customer/menuSlice';

export const useMenu = () => {
  const dispatch = useDispatch();
  const { merchant, branch, items, loading, error } = useSelector((state) => state.menu);

  const fetchMenuItems = (params = {}) => {
    return dispatch(fetchMenu(params)).unwrap();
  };

  const resetError = () => {
    dispatch(resetMenuError());
  };

  return {
    merchant,
    branch,
    items,
    loading,
    error,
    fetchMenuItems,
    resetError,
  };
};