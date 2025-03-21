/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, createBranch, updateBranch, deleteBranch } from '@/features/merchant/branch/branchThunks';
import { clearError } from '@/features/merchant/branch/branchSlice';
import { Link } from 'react-router-dom';

const branchManagementStyles = (theme) => css`
  padding: ${theme.spacing[4]};
  max-width: ${theme.breakpoints['2xl']};
  margin: 0 auto;
`;

const branchListStyles = (theme) => css`
  list-style: none;
  padding: 0;
`;

const branchItemStyles = (theme) => css`
  padding: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[2]};
  background-color: ${theme.greenScale[800]};
  border-radius: ${theme.radii.md};
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonStyles = (theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${theme.greenScale[600]};
  color: #ffffff;
  border: none;
  border-radius: ${theme.radii.sm};
  cursor: pointer;
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${theme.greenScale[500]};
  }
`;

const actionButtonStyles = (theme) => css`
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  margin-left: ${theme.spacing[2]};
  background-color: ${theme.greenScale[700]};
  color: #ffffff;
  border: none;
  border-radius: ${theme.radii.sm};
  cursor: pointer;
  &:hover {
    background-color: ${theme.greenScale[600]};
  }
`;

const errorStyles = (theme) => css`
  color: ${theme.roles.customer.accent};
  margin-bottom: ${theme.spacing[2]};
`;

const BranchManagement = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branch);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleCreateBranch = () => {
    const sampleBranch = {
      name: 'New Branch',
      branch_code: `BR${Date.now()}`,
      contact_email: 'newbranch@example.com',
      contact_phone: '+1234567890',
      address: '123 New St',
      location: { latitude: 40.7128, longitude: -74.0060 },
      operating_hours: { monday: { open: '09:00', close: '17:00' } },
      delivery_radius: 5,
    };
    dispatch(createBranch(sampleBranch));
  };

  const handleDeleteBranch = (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      dispatch(deleteBranch(branchId));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div css={branchManagementStyles(theme)}>
      <h1>Branch Management</h1>
      {error && (
        <div css={errorStyles(theme)}>
          {error} <button css={actionButtonStyles(theme)} onClick={() => dispatch(clearError())}>Dismiss</button>
        </div>
      )}
      <button css={buttonStyles(theme)} onClick={handleCreateBranch}>
        Add New Branch
      </button>
      <ul css={branchListStyles(theme)}>
        {branches.map((branch) => (
          <li key={branch.id} css={branchItemStyles(theme)}>
            <span>
              {branch.name} - {branch.address}
              <Link to={`/merchant/branch-management/${branch.id}`} css={{ marginLeft: theme.spacing[2], color: '#ffffff' }}>
                View Details
              </Link>
            </span>
            <button css={actionButtonStyles(theme)} onClick={() => handleDeleteBranch(branch.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchManagement;