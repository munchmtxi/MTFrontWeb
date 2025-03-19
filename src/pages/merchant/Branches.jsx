/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { createBranchThunk, updateBranchThunk } from '@/features/merchant/merchantProfileThunks'; // Updated imports
import MerchantHeader from '@/components/merchant/MerchantHeader';

// ----- Styles -----
const pageStyles = (theme) => css`
  min-height: 100vh;
  background-color: ${theme.grayScale[100]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const containerStyles = (theme) => css`
  max-width: ${theme.breakpoints.lg};
  margin: 0 auto;
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  color: ${theme.greenScale[700]};
  margin-bottom: ${theme.spacing[4]};
`;

const inputStyles = (theme) => css`
  width: 100%;
  padding: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[3]};
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.grayScale[300]};
  font-size: ${theme.typography.fontSizes.md};
`;

const buttonStyles = (theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${theme.greenScale[500]};
  color: #ffffff;
  border: none;
  border-radius: ${theme.radii.md};
  cursor: pointer;
  &:hover {
    background-color: ${theme.greenScale[400]};
  }
`;

const branchListStyles = (theme) => css`
  margin-top: ${theme.spacing[4]};
`;

const branchItemStyles = (theme) => css`
  padding: ${theme.spacing[2]};
  border: 1px solid ${theme.grayScale[300]};
  border-radius: ${theme.radii.md};
  margin-bottom: ${theme.spacing[2]};
`;

const errorStyles = (theme) => css`
  color: ${theme.grayScale[400]};
  font-size: ${theme.typography.fontSizes.md};
  margin-bottom: ${theme.spacing[3]};
`;

// ----- Branches Component -----
const Branches = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { branches, status, error } = useSelector((state) => state.merchantProfile);
  const [newBranch, setNewBranch] = useState({ name: '', location: '' });
  const [editBranch, setEditBranch] = useState(null);

  if (!token || user?.role !== 'merchant') {
    return <Navigate to="/" replace />;
  }

  const handleNewChange = (e) => {
    setNewBranch({ ...newBranch, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditBranch({ ...editBranch, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createBranchThunk(newBranch)).then(() => setNewBranch({ name: '', location: '' })); // Updated
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateBranchThunk({ branchId: editBranch.id, branchData: editBranch })).then(() => // Updated
      setEditBranch(null)
    );
  };

  return (
    <div css={pageStyles(theme)}>
      <MerchantHeader />
      <div css={containerStyles(theme)}>
        <h1 css={headingStyles(theme)}>Branches</h1>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p css={errorStyles(theme)}>{error}</p>}
        <form onSubmit={handleCreate}>
          <input
            css={inputStyles(theme)}
            type="text"
            name="name"
            value={newBranch.name}
            onChange={handleNewChange}
            placeholder="Branch Name"
          />
          <input
            css={inputStyles(theme)}
            type="text"
            name="location"
            value={newBranch.location}
            onChange={handleNewChange}
            placeholder="Location"
          />
          <button css={buttonStyles(theme)} type="submit">
            Add Branch
          </button>
        </form>
        <div css={branchListStyles(theme)}>
          {branches.map((branch) => (
            <div key={branch.id} css={branchItemStyles(theme)}>
              {editBranch?.id === branch.id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    css={inputStyles(theme)}
                    type="text"
                    name="name"
                    value={editBranch.name}
                    onChange={handleEditChange}
                  />
                  <input
                    css={inputStyles(theme)}
                    type="text"
                    name="location"
                    value={editBranch.location}
                    onChange={handleEditChange}
                  />
                  <button css={buttonStyles(theme)} type="submit">
                    Save
                  </button>
                  <button
                    css={buttonStyles(theme)}
                    onClick={() => setEditBranch(null)}
                    type="button"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p>{branch.name} - {branch.location}</p>
                  <button
                    css={buttonStyles(theme)}
                    onClick={() => setEditBranch(branch)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;