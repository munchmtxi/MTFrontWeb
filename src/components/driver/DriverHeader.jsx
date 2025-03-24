/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '@/features/auth/authSlice';

const headerStyles = (theme) => css`
  background-color: ${theme.components.roles.driver?.primary || theme.grayScale[700]};
  padding: ${theme.spacing[4]} ${theme.spacing[3]};
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: ${theme.zIndices.header || 40};
`;

const titleStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
`;

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.secondary};
  ${theme.components.button.sizes.sm};
  cursor: pointer;
  transition: background-color 0.15s ${theme.transitions.timing.easeOut};
  &:hover {
    background-color: ${theme.components.button.variants.secondary._hover?.backgroundColor || theme.grayScale[600]};
  }
`;

const linkStyles = (theme) => css`
  color: #ffffff;
  text-decoration: none;
  font-size: ${theme.typography.fontSizes.sm};
  margin-right: ${theme.spacing[4]};
  &:hover {
    text-decoration: underline;
  }
`;

const DriverHeader = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header css={headerStyles(theme)}>
      <div css={titleStyles(theme)}>Driver Dashboard</div>
      <div>
        <Link to="/driver/profile" css={linkStyles(theme)}>Profile</Link>
        <button onClick={handleLogout} css={buttonStyles(theme)}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default DriverHeader;