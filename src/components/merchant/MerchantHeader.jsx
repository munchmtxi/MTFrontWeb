/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';
import { User, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';

const merchantHeaderStyles = (theme) => css`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #000000;
  padding: ${theme.spacing[4]} ${theme.spacing[3]};
  color: #ffffff;
  box-shadow: ${theme.shadows.sm};
`;

const containerStyles = (theme) => css`
  max-width: ${theme.breakpoints['2xl']};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.spacing[2]};
`;

const logoStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
`;

const munchStyles = (theme) => css`color: ${theme.components.roles.customer.primary};`;
const mStyles = (theme) => css`color: ${theme.components.roles.customer.secondary};`;
const txiStyles = (theme) => css`color: #ffffff;`;

const profileContainerStyles = (theme) => css`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const profileIconStyles = (theme) => css`
  color: #ffffff;
  margin-right: ${theme.spacing[2]};
  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const dropdownStyles = (theme) => css`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${theme.greenScale[700]};
  border-radius: ${theme.radii.md};
  box-shadow: ${theme.shadows.lg};
  min-width: 200px;
  padding: ${theme.spacing[2]};
  z-index: 100;
`;

const dropdownItemStyles = (theme) => css`
  color: #ffffff;
  text-decoration: none;
  font-size: ${theme.typography.fontSizes.md};
  font-family: ${theme.typography.fonts.body};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  display: block;
  transition: background-color 0.15s ease-out;
  &:hover {
    background-color: ${theme.greenScale[600]};
  }
`;

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const MerchantHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isMerchant = token && user?.role === 'merchant';
  if (!isMerchant) return null;

  const handleProfileClick = (e) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <motion.header css={merchantHeaderStyles(theme)} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
      <div css={containerStyles(theme)}>
        <Link to="/merchant/dashboard" css={logoStyles(theme)}>
          <span css={munchStyles(theme)}>MUNCH</span>
          <span css={mStyles(theme)}>M</span>
          <span css={txiStyles(theme)}>TXI</span>
        </Link>
        <div css={profileContainerStyles(theme)} onClick={handleProfileClick}>
          <User css={profileIconStyles(theme)} size={24} />
          <ChevronDown css={profileIconStyles(theme)} size={16} />
          {isDropdownOpen && (
            <motion.div
              css={dropdownStyles(theme)}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Link to="/merchant/profile" css={dropdownItemStyles(theme)}>Profile</Link>
              <Link to="/merchant/business-hours" css={dropdownItemStyles(theme)}>Business Hours</Link>
              <Link to="/merchant/delivery-settings" css={dropdownItemStyles(theme)}>Delivery Settings</Link>
              <Link to="/merchant/branches" css={dropdownItemStyles(theme)}>Branches</Link>
              <button onClick={handleLogout} css={dropdownItemStyles(theme)}>Logout</button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default MerchantHeader;