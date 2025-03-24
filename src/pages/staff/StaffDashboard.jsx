/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, useTheme } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StaffHeader from '@/components/staff/StaffHeader';

// Styles
const dashboardStyles = (theme) => css`
  min-height: 100vh;
  background-color: ${theme.grayScale[100]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const welcomeStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.components.roles.staff?.primary || theme.components.roles.customer.primary};
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
  width: ${theme.spacing[40]};
  margin: ${theme.spacing[2]} 0;
  transition: background-color 0.15s ${theme.transitions.timing.easeOut};
  &:hover {
    background-color: ${theme.components.button.variants.primary._hover?.backgroundColor || theme.grayScale[400]};
  }
`;

// StaffDashboard Component
const StaffDashboard = () => {
  const theme = useTheme();
  const { user, token } = useSelector((state) => state.auth);

  if (!token || user?.role !== 'staff') {
    return <Navigate to="/" replace />;
  }

  return (
    <div css={dashboardStyles(theme)}>
      <StaffHeader />
      <h1 css={welcomeStyles(theme)}>Welcome to your Staff Dashboard, {user?.email}!</h1>
      <div css={linkContainerStyles(theme)}>
        <Link to="/staff/schedule" css={linkStyles(theme)}>
          View Schedule
        </Link>
        <Link to="/staff/tasks" css={linkStyles(theme)}>
          Manage Tasks
        </Link>
        <Link to="/staff/profile" css={linkStyles(theme)}>
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default StaffDashboard;