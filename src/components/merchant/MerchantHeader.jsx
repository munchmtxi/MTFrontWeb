/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { User, Wrench, ChevronDown, Store, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import useBranches from '../../hooks/useBranches';

// Basic styling using Emotion, no external theme dependency
const merchantHeaderStyles = css`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #000;
  padding: 16px 12px;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const containerStyles = css`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const logoStyles = css`
  font-family: sans-serif;
  font-size: 24px;
  font-weight: bold;
`;

const munchStyles = css`
  color: #e53e3e;
`;
const mStyles = css`
  color: #38a169;
`;
const txiStyles = css`
  color: #fff;
`;

const navContainerStyles = css`
  display: flex;
  align-items: center;
`;

const branchContainerStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
`;

const profileContainerStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
`;

const toolsContainerStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const reservationsContainerStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
`;

const iconStyles = css`
  color: #fff;
  margin-right: 8px;
  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const dropdownStyles = css`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2f855a;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  padding: 8px;
  z-index: 100;
`;

const dropdownItemStyles = css`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-family: sans-serif;
  padding: 8px 12px;
  display: block;
  transition: background-color 0.15s ease-out;
  &:hover {
    background-color: #276749;
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
  const { branches, getBranches, loading, error } = useBranches();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isReservationsDropdownOpen, setIsReservationsDropdownOpen] = useState(false);

  const isMerchant = token && user?.role === 'merchant';
  if (!isMerchant) return null;

  // Fetch branches on mount only if branches are empty and not already loading
  useEffect(() => {
    const fetchBranchesOnce = async () => {
      if (branches.length === 0 && !loading) {
        await getBranches();
      }
    };
    fetchBranchesOnce();
  }, [branches, loading, getBranches]);

  const branchId = branches.length > 0 ? branches[0].id : '1';

  const handleProfileClick = (e) => {
    e.preventDefault();
    setIsProfileDropdownOpen((prev) => !prev);
    setIsToolsDropdownOpen(false);
    setIsBranchDropdownOpen(false);
    setIsReservationsDropdownOpen(false);
  };

  const handleToolsClick = (e) => {
    e.preventDefault();
    setIsToolsDropdownOpen((prev) => !prev);
    setIsProfileDropdownOpen(false);
    setIsBranchDropdownOpen(false);
    setIsReservationsDropdownOpen(false);
  };

  const handleBranchClick = (e) => {
    e.preventDefault();
    setIsBranchDropdownOpen((prev) => !prev);
    setIsProfileDropdownOpen(false);
    setIsToolsDropdownOpen(false);
    setIsReservationsDropdownOpen(false);
  };

  const handleReservationsClick = (e) => {
    e.preventDefault();
    setIsReservationsDropdownOpen((prev) => !prev);
    setIsProfileDropdownOpen(false);
    setIsToolsDropdownOpen(false);
    setIsBranchDropdownOpen(false);
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
        <Link to="/merchant/dashboard" css={logoStyles}>
          <span css={munchStyles}>MUNCH</span>
          <span css={mStyles}>M</span>
          <span css={txiStyles}>TXI</span>
        </Link>
        <div css={navContainerStyles}>
          {loading && <span>Loading branches...</span>}
          {error && <span css={css`color: red;`}>Error: {error}</span>}
          <div css={branchContainerStyles} onClick={handleBranchClick}>
            <Store css={iconStyles} size={24} />
            <ChevronDown css={iconStyles} size={16} />
            {isBranchDropdownOpen && (
              <motion.div
                css={dropdownStyles}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to="/merchant/branch-management" css={dropdownItemStyles}>
                  Branch Management
                </Link>
                <Link to="/merchant/branch-security" css={dropdownItemStyles}>
                  Branch Security
                </Link>
              </motion.div>
            )}
          </div>
          <div css={reservationsContainerStyles} onClick={handleReservationsClick}>
            <Calendar css={iconStyles} size={24} />
            <ChevronDown css={iconStyles} size={16} />
            {isReservationsDropdownOpen && (
              <motion.div
                css={dropdownStyles}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to={`/merchant/reservations/${branchId}`} css={dropdownItemStyles}>
                  Reservations
                </Link>
              </motion.div>
            )}
          </div>
          <div css={profileContainerStyles} onClick={handleProfileClick}>
            <User css={iconStyles} size={24} />
            <ChevronDown css={iconStyles} size={16} />
            {isProfileDropdownOpen && (
              <motion.div
                css={dropdownStyles}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to="/merchant/profile" css={dropdownItemStyles}>
                  Profile
                </Link>
                <Link to="/merchant/business-hours" css={dropdownItemStyles}>
                  Business Hours
                </Link>
                <Link to="/merchant/delivery-settings" css={dropdownItemStyles}>
                  Delivery Settings
                </Link>
                <Link to="/merchant/branches" css={dropdownItemStyles}>
                  Branches
                </Link>
                <Link to="/merchant/2fa" css={dropdownItemStyles}>
                  2FA
                </Link>
                <Link to="/merchant/password" css={dropdownItemStyles}>
                  Password
                </Link>
                <button onClick={handleLogout} css={dropdownItemStyles}>
                  Logout
                </button>
              </motion.div>
            )}
          </div>
          <div css={toolsContainerStyles} onClick={handleToolsClick}>
            <Wrench css={iconStyles} size={24} />
            <ChevronDown css={iconStyles} size={16} />
            {isToolsDropdownOpen && (
              <motion.div
                css={dropdownStyles}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to="/merchant/banners" css={dropdownItemStyles}>
                  Banners
                </Link>
                <Link to="/merchant/activity-log" css={dropdownItemStyles}>
                  Activity Log
                </Link>
                <Link to="/merchant/analytics" css={dropdownItemStyles}>
                  Analytics
                </Link>
                <Link to="/merchant/drafts" css={dropdownItemStyles}>
                  Drafts
                </Link>
                <Link to="/merchant/images" css={dropdownItemStyles}>
                  Images
                </Link>
                <Link to="/merchant/inventory" css={dropdownItemStyles}>
                  Inventory
                </Link>
                <Link to="/merchant/maps" css={dropdownItemStyles}>
                  Maps
                </Link>
                <Link to="/merchant/performance-metrics" css={dropdownItemStyles}>
                  Performance Metrics
                </Link>
                <Link to="/merchant/preview" css={dropdownItemStyles}>
                  Preview
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default MerchantHeader;
