/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/authSlice';

// Styles
const headerStyles = (theme) => css`
  background-color: ${theme.components.roles.staff?.primary || theme.grayScale[800]};
  padding: ${theme.spacing[4]} ${theme.spacing[3]};
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: ${theme.zIndices.sticky || 40}; // Use sticky z-index
`;

const titleStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
`;

const dropdownStyles = (theme) => css`
  position: relative;
  display: inline-block;
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

const dropdownContentStyles = (theme) => css`
  display: none;
  position: absolute;
  right: 0;
  background-color: ${theme.grayScale[700]};
  min-width: 160px;
  box-shadow: ${theme.shadows.md};
  z-index: 1;
  border-radius: ${theme.radii?.sm || '0.125rem'}; // Fix: Use radii.sm with fallback
  &.show {
    display: block;
  }
`;

const dropdownItemStyles = (theme) => css`
  color: #ffffff;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  text-decoration: none;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: ${theme.grayScale[600]};
  }
`;

// StaffHeader Component
const StaffHeader = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log('StaffHeader theme:', theme); // Debug theme

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header css={headerStyles(theme)}>
      <div css={titleStyles(theme)}>Staff Dashboard</div>
      <div css={dropdownStyles(theme)}>
        <button css={buttonStyles(theme)} onClick={toggleDropdown}>
          Menu
        </button>
        <div css={dropdownContentStyles(theme)} className={dropdownOpen ? 'show' : ''}>
          <div css={dropdownItemStyles(theme)} onClick={() => navigate('/staff/profile')}>
            Profile
          </div>
          <div css={dropdownItemStyles(theme)} onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;