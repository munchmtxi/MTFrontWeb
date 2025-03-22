/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchInventoryStatsThunk } from '../../features/merchant/inventoryThunks';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Styles
const inventoryStyles = (theme) => css`
  min-height: 100vh;
  background-color: ${theme.grayScale[100]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const headerStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.components.roles.merchant.primary};
  text-align: center;
  margin-bottom: ${theme.spacing[4]};
`;

const selectStyles = (theme) => css`
  ${theme.components.input.baseStyle};
  ${theme.components.input.sizes.md};
  width: 200px;
  margin: 0 auto ${theme.spacing[4]} auto;
  display: block;
`;

const statsContainerStyles = (theme) => css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing[4]};
  max-width: ${theme.breakpoints['2xl']};
  margin: 0 auto;
`;

const statCardStyles = (theme) => css`
  ${theme.components.card.baseStyle};
  ${theme.components.card.variants.gradient};
  padding: ${theme.spacing[4]};
  text-align: center;
`;

const statLabelStyles = (theme) => css`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.grayScale[300]};
  margin-bottom: ${theme.spacing[2]};
`;

const statValueStyles = (theme) => css`
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: #ffffff;
`;

const errorStyles = (theme) => css`
  color: ${theme.components.roles.merchant.accent};
  text-align: center;
  font-size: ${theme.typography.fontSizes.md};
  margin-top: ${theme.spacing[4]};
`;

// Dummy branch data (replace with real branch fetch if available)
const branches = [
  { id: null, name: 'All Branches' },
  { id: 1, name: 'Branch 1' },
  { id: 2, name: 'Branch 2' },
];

// Component
const Inventory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { stats, branchId, loading, error } = useSelector((state) => state.inventory);
  const [selectedBranch, setSelectedBranch] = useState(branchId || null);

  useEffect(() => {
    if (token && user?.role === 'merchant') {
      dispatch(fetchInventoryStatsThunk(selectedBranch));
    }
  }, [dispatch, token, user, selectedBranch]);

  const handleBranchChange = (e) => {
    const branchId = e.target.value === 'all' ? null : parseInt(e.target.value, 10);
    setSelectedBranch(branchId);
  };

  if (!token || user?.role !== 'merchant') {
    return <Navigate to="/" replace />;
  }

  return (
    <div css={inventoryStyles(theme)}>
      <MerchantHeader />
      <h1 css={headerStyles(theme)}>Inventory Overview</h1>
      <select css={selectStyles(theme)} value={selectedBranch || 'all'} onChange={handleBranchChange}>
        {branches.map((branch) => (
          <option key={branch.id || 'all'} value={branch.id || 'all'}>
            {branch.name}
          </option>
        ))}
      </select>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p css={errorStyles(theme)}>Error: {error}</p>
      ) : (
        <div css={statsContainerStyles(theme)}>
          <div css={statCardStyles(theme)}>
            <div css={statLabelStyles(theme)}>Total Products</div>
            <div css={statValueStyles(theme)}>{stats.total_products}</div>
          </div>
          <div css={statCardStyles(theme)}>
            <div css={statLabelStyles(theme)}>Tracked Products</div>
            <div css={statValueStyles(theme)}>{stats.tracked_products}</div>
          </div>
          <div css={statCardStyles(theme)}>
            <div css={statLabelStyles(theme)}>Out of Stock</div>
            <div css={statValueStyles(theme)}>{stats.out_of_stock_products}</div>
          </div>
          <div css={statCardStyles(theme)}>
            <div css={statLabelStyles(theme)}>Low Stock</div>
            <div css={statValueStyles(theme)}>{stats.low_stock_products}</div>
          </div>
          <div css={statCardStyles(theme)}>
            <div css={statLabelStyles(theme)}>Inventory Value</div>
            <div css={statValueStyles(theme)}>
              ${(Math.round(stats.inventory_value * 100) / 100).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;