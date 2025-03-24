/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import CustomerHeader from '../../components/customer/CustomerHeader';

const dashboardStyle = css`
  padding: 2rem;
`;

const CustomerDashboard = () => {
  return (
    <div css={dashboardStyle}>
      <CustomerHeader />
      <h1>Welcome to Your Customer Dashboard</h1>
      <p>Manage your profile, payment methods, and more from here.</p>
    </div>
  );
};

export default CustomerDashboard;