/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, useTheme } from '@emotion/react';
import { Navigate } from 'react-router-dom';
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
  color: ${theme.greenScale[700]};
  text-align: center;
  margin-top: ${theme.spacing[6]};
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
    </div>
  );
};

export default MerchantDashboard;