/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { User, Wrench, ChevronDown, Store, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import useBranches from '../../hooks/useBranches';

// Header Styles
const merchantHeaderStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: #111827;
  padding: 12px 20px;
  color: #d1d5db;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const containerStyles = css`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logoStyles = css`
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const munchStyles = css`color: #1dbf1d;`;
const mStyles = css`color: #fedc01;`;
const txiStyles = css`color: #d1d5db;`;

const navContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const dropdownContainerStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #2d3748;
  }
`;

const navTextStyles = css`
  font-size: 14px;
  font-weight: 500;
  color: #d1d5db;
`;

const iconStyles = css`
  color: #d1d5db;
  margin-right: 6px;
`;

const dropdownStyles = css`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2d3748;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  min-width: 180px;
  padding: 8px;
  z-index: 100;
  margin-top: 4px;
`;

const dropdownItemStyles = css`
  color: #d1d5db;
  text-decoration: none;
  font-size: 13px;
  padding: 6px 12px;
  display: block;
  border-radius: 4px;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: #fedc01;
    color: #111827;
  }
`;

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const MerchantHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { branches, getBranches, loading } = useBranches();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);

  if (!token || user?.role !== 'merchant') return null;

  useEffect(() => {
    if (branches.length === 0 && !loading) getBranches();
  }, [branches, loading, getBranches]);

  const branchId = branches.length > 0 ? branches[0].id : '1';

  const toggleDropdown = (dropdown) => {
    setIsProfileOpen(dropdown === 'profile' ? !isProfileOpen : false);
    setIsToolsOpen(dropdown === 'tools' ? !isToolsOpen : false);
    setIsBranchOpen(dropdown === 'branch' ? !isBranchOpen : false);
    setIsReservationsOpen(dropdown === 'reservations' ? !isReservationsOpen : false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <motion.header
      css={merchantHeaderStyles}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div css={containerStyles}>
        {/* Logo */}
        <Link to="/merchant/dashboard" css={logoStyles}>
          <span css={munchStyles}>MUNCH</span>
          <span css={mStyles}>M</span>
          <span css={txiStyles}>TXI</span>
        </Link>

        {/* Navigation */}
        <div css={navContainerStyles}>
          {/* Branches */}
          <div css={dropdownContainerStyles} onClick={() => toggleDropdown('branch')}>
            <Store css={iconStyles} size={18} />
            <span css={navTextStyles}>Branches</span>
            <ChevronDown css={iconStyles} size={14} />
            {isBranchOpen && (
              <motion.div
                css={dropdownStyles}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to="/merchant/branches" css={dropdownItemStyles}>Branches</Link>
                <Link to="/merchant/branch-management" css={dropdownItemStyles}>Branch Management</Link>
              </motion.div>
            )}
          </div>

          {/* Reservations */}
          <div css={dropdownContainerStyles} onClick={() => toggleDropdown('reservations')}>
            <Calendar css={iconStyles} size={18} />
            <span css={navTextStyles}>Reservations</span>
            <ChevronDown css={iconStyles} size={14} />
            {isReservationsOpen && (
              <motion.div
                css={dropdownStyles}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to={`/merchant/reservations/${branchId}`} css={dropdownItemStyles}>Reservations</Link>
              </motion.div>
            )}
          </div>

          {/* Tools */}
          <div css={dropdownContainerStyles} onClick={() => toggleDropdown('tools')}>
            <Wrench css={iconStyles} size={18} />
            <span css={navTextStyles}>Tools</span>
            <ChevronDown css={iconStyles} size={14} />
            {isToolsOpen && (
              <motion.div
                css={dropdownStyles}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to="/merchant/banners" css={dropdownItemStyles}>Banners</Link>
                <Link to="/merchant/drafts" css={dropdownItemStyles}>Drafts</Link>
                <Link to="/merchant/inventory" css={dropdownItemStyles}>Inventory</Link>
                <Link to="/merchant/analytics" css={dropdownItemStyles}>Analytics</Link>
                <Link to="/merchant/performance-metrics" css={dropdownItemStyles}>Performance Metrics</Link>
                <Link to="/merchant/products" css={dropdownItemStyles}>Products</Link>
                <Link to="/merchant/images" css={dropdownItemStyles}>Images</Link>
                <Link to="/merchant/maps" css={dropdownItemStyles}>Maps</Link>
              </motion.div>
            )}
          </div>

          {/* Profile */}
          <div css={dropdownContainerStyles} onClick={() => toggleDropdown('profile')}>
            <User css={iconStyles} size={18} />
            <span css={navTextStyles}>{user?.email.split('@')[0]}</span>
            <ChevronDown css={iconStyles} size={14} />
            {isProfileOpen && (
              <motion.div
                css={dropdownStyles}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to="/merchant/profile" css={dropdownItemStyles}>Profile</Link>
                <Link to="/merchant/business-hours" css={dropdownItemStyles}>Business Hours</Link>
                <Link to="/merchant/delivery-settings" css={dropdownItemStyles}>Delivery Settings</Link>
                <Link to="/merchant/business-type-settings" css={dropdownItemStyles}>Business Type</Link>
                <Link to="/merchant/2fa" css={dropdownItemStyles}>2FA</Link>
                <Link to="/merchant/password" css={dropdownItemStyles}>Password</Link>
                <button onClick={handleLogout} css={dropdownItemStyles}>Logout</button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default MerchantHeader;