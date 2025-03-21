/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, useTheme } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MerchantHeader from '@/components/merchant/MerchantHeader';

// ----- Styles -----
const dashboardStyles = (theme) => css`
  min-height: 100vh;
  background-color: ${theme.grayScale[100]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const welcomeStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.components.roles.merchant.primary}; // Updated to use merchant primary color
  text-align: center;
  margin-top: ${theme.spacing[6]};
`;

const linkContainerStyles = (theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${theme.spacing[6]};
`;

const linkStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  display: inline-block;
  text-decoration: none;
  text-align: center;
  width: ${theme.spacing[40]}; // Fixed width for consistency
  margin: ${theme.spacing[2]} 0;
`;

// ----- MerchantDashboard Component -----
const MerchantDashboard = () => {
  const theme = useTheme();
  const { user, token } = useSelector((state) => state.auth);

  if (!token || user?.role !== 'merchant') {
    return <Navigate to="/" replace />;
  }

  return (
    <div css={dashboardStyles(theme)}>
      <MerchantHeader />
      <h1 css={welcomeStyles(theme)}>Welcome to your Merchant Dashboard, {user?.email}!</h1>
      <div css={linkContainerStyles(theme)}>
        <Link to="/merchant/products" css={linkStyles(theme)}>
          Manage Products
        </Link>
        {/* Add more links as needed */}
        <Link to="/merchant/profile" css={linkStyles(theme)}>
          View Profile
        </Link>
        <Link to="/merchant/analytics" css={linkStyles(theme)}>
          View Analytics
        </Link>
      </div>
    </div>
  );
};

export default MerchantDashboard;