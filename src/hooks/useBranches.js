import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, createBranch, updateBranch, deleteBranch } from '../features/merchant/branch/branchThunks';
import { clearError } from '../features/merchant/branch/branchSlice';
import { useCallback } from 'react';

const useBranches = () => {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branch);

  const getBranches = useCallback(async () => {
    try {
      await dispatch(fetchBranches()).unwrap();
    } catch (err) {
      console.error('Error fetching branches:', err);
    }
  }, [dispatch]);

  const addBranch = (branchData) => {
    dispatch(createBranch(branchData));
  };

  const editBranch = (branchId, branchData) => {
    dispatch(updateBranch({ branchId, branchData }));
  };

  const removeBranch = (branchId) => {
    dispatch(deleteBranch(branchId));
  };

  const resetError = () => {
    dispatch(clearError());
  };

  return {
    branches,
    loading,
    error,
    getBranches,
    addBranch,
    editBranch,
    removeBranch,
    resetError,
  };
};

export default useBranches;