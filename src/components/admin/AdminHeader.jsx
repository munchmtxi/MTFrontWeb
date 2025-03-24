/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/authSlice'; // Import logout action from authSlice

// ----- Styles -----
const headerStyles = (theme) => css`
  background-color: ${theme.components.roles.admin?.primary || theme.grayScale[900]};
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

// ----- AdminHeader Component -----
const AdminHeader = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/');
  };

  return (
    <header css={headerStyles(theme)}>
      <div css={titleStyles(theme)}>Admin Dashboard</div>
      <button onClick={handleLogout} css={buttonStyles(theme)}>
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;