/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/features/auth/authThunks';
import { staffLogin } from '@/features/auth/staffAuthThunks';
import { driverLogin } from '@/features/auth/driverAuthThunks';
import { customerLogin } from '@/features/auth/customerAuthThunks';
import { v4 as uuidv4 } from 'uuid';
import store from '@/store';

// Styles adapted from DriverPassword
const headerStyles = css`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #1a202c; /* Dark blue-grey background */
  padding: 20px;
  color: #d1d5db; /* Light grey text */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const containerStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logoStyles = css`
  font-size: 24px; /* Approximation of 2xl */
  font-weight: 600;
  color: #fedc01; /* Yellow */
`;

const navStyles = css`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const linkStyles = css`
  color: #d1d5db;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.3s ease;
  &:hover {
    color: #fedc01; /* Yellow on hover */
  }
`;

const dropdownButtonStyles = css`
  background: none;
  border: none;
  color: #d1d5db;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;
  &:hover {
    color: #fedc01;
  }
`;

const dropdownStyles = css`
  position: absolute;
  top: 110%;
  right: 0;
  background: #2d3748; /* Dark grey cards */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 101;
`;

const dropdownLinkStyles = css`
  color: #d1d5db;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 12px;
  transition: all 0.3s ease;
  &:hover {
    background: #fedc01; /* Yellow */
    color: #111827;
  }
`;

const modalStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #2d3748; /* Dark grey cards */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 200;
  width: 90%;
  max-width: 600px; /* Approximation of md container */
  color: #d1d5db;
`;

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

const modalHeadingStyles = css`
  font-size: 24px; /* Approximation of 2xl */
  font-weight: 600;
  color: #fedc01; /* Yellow */
  margin-bottom: 15px;
`;

const inputStyles = css`
  display: block;
  width: 100%;
  padding: 8px 12px; /* Approximation of md input size */
  margin-bottom: 15px;
  background: #1f2937; /* Slightly darker grey */
  border: none;
  border-radius: 4px;
  color: #d1d5db;
  font-size: 14px;
`;

const buttonStyles = css`
  padding: 10px 20px;
  background: #fedc01; /* Yellow */
  color: #111827;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  width: 100%;
  font-weight: 600;
  &:hover {
    background: #d4b501; /* Slightly darker yellow */
  }
  &:disabled {
    background: #6b7280; /* Grey for disabled state */
    cursor: not-allowed;
  }
`;

const errorStyles = css`
  color: #f87171; /* Red for errors */
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] } },
};

// ModalForm Component
const ModalForm = ({ title, onSubmit, onClose, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div css={overlayStyles} onClick={onClose} />
      <form css={modalStyles} onSubmit={(e) => onSubmit(e, email, password)}>
        <h2 css={modalHeadingStyles}>{title}</h2>
        <input
          css={inputStyles}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          css={inputStyles}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {error && <div css={errorStyles}>{error}</div>}
        <button type="submit" css={buttonStyles} disabled={!!error && error.includes('Too many')}>
          Login
        </button>
        <button type="button" onClick={onClose} css={buttonStyles}>
          Close
        </button>
      </form>
    </>
  );
};

// Header Component
const Header = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [partnerDropdownOpen, setPartnerDropdownOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e, email, password, role) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setLoginError(null);
    const deviceId = uuidv4();
    const deviceType = 'desktop';
    try {
      let result;
      switch (role) {
        case 'customer':
          result = await dispatch(customerLogin({ 
            email, 
            password, 
            deviceInfo: { deviceId, deviceType } 
          })).unwrap();
          break;
        case 'merchant':
          result = await dispatch(login({ email, password, deviceId, deviceType })).unwrap();
          break;
        case 'staff':
          result = await dispatch(staffLogin({ email, password })).unwrap();
          break;
        case 'driver':
          result = await dispatch(driverLogin({ email, password, deviceId, deviceType })).unwrap();
          break;
        case 'admin':
          result = await dispatch(staffLogin({ email, password })).unwrap();
          break;
        default:
          throw new Error('Unknown role');
      }
      console.log('Login result:', result);

      const updatedState = store.getState().auth;
      console.log('Redux state after dispatch:', updatedState);

      setLoginModalOpen(false);
      setPartnerModalOpen(null);

      const userRole = updatedState.user?.role || result.user.role;
      console.log('Navigating with role:', userRole);
      switch (userRole) {
        case 'customer':
          navigate('/customer/dashboard');
          break;
        case 'merchant':
          navigate('/merchant/dashboard');
          break;
        case 'staff':
          navigate('/staff/dashboard');
          break;
        case 'driver':
          navigate('/driver/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          console.warn('Unknown role, redirecting to /:', userRole);
          navigate('/');
      }
    } catch (error) {
      console.error('Login error details:', error);
      setLoginError(error.message || `${role.charAt(0).toUpperCase() + role.slice(1)} login failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePartnerDropdown = () => setPartnerDropdownOpen((prev) => !prev);

  const handlePartnerLoginClick = (role) => {
    setPartnerDropdownOpen(false);
    setPartnerModalOpen(role);
  };

  return (
    <>
      <motion.header css={headerStyles} initial="hidden" animate="visible" variants={containerVariants}>
        <div css={containerStyles}>
          <motion.div variants={itemVariants}>
            <Link to="/" css={logoStyles}>
              MUNCHMTXI {/* Simplified logo, adjust as needed */}
            </Link>
          </motion.div>
          <motion.nav css={navStyles} variants={itemVariants}>
            <Link to="/features" css={linkStyles}>Features</Link>
            <Link to="/contact" css={linkStyles}>Contact</Link>
            <button onClick={() => setLoginModalOpen(true)} css={linkStyles}>Login</button>
            <div css={css`position: relative;`}>
              <button onClick={togglePartnerDropdown} css={dropdownButtonStyles}>
                Partner Login
              </button>
              {partnerDropdownOpen && (
                <motion.div
                  css={dropdownStyles}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                >
                  <button onClick={() => handlePartnerLoginClick('merchant')} css={dropdownLinkStyles}>
                    Merchant Login
                  </button>
                  <button onClick={() => handlePartnerLoginClick('staff')} css={dropdownLinkStyles}>
                    Staff Login
                  </button>
                  <button onClick={() => handlePartnerLoginClick('driver')} css={dropdownLinkStyles}>
                    Driver Login
                  </button>
                  <button onClick={() => handlePartnerLoginClick('admin')} css={dropdownLinkStyles}>
                    Admin Login
                  </button>
                </motion.div>
              )}
            </div>
            <Link to="/register" css={linkStyles}>Sign Up</Link>
          </motion.nav>
        </div>
      </motion.header>

      {loginModalOpen && (
        <ModalForm
          title="Customer Login"
          onSubmit={(e, email, password) => handleLogin(e, email, password, 'customer')}
          onClose={() => {
            setLoginModalOpen(false);
            setLoginError(null);
          }}
          error={loginError}
        />
      )}

      {partnerModalOpen && (
        <ModalForm
          title={`${partnerModalOpen.charAt(0).toUpperCase() + partnerModalOpen.slice(1)} Login`}
          onSubmit={(e, email, password) => handleLogin(e, email, password, partnerModalOpen)}
          onClose={() => {
            setPartnerModalOpen(null);
            setLoginError(null);
          }}
          error={loginError}
        />
      )}
    </>
  );
};

export default Header;