/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/features/auth/authThunks';
import { staffLogin } from '@/features/auth/staffAuthThunks';
import { driverLogin } from '@/features/auth/driverAuthThunks';
import { customerLogin } from '@/features/auth/customerAuthThunks';
import { v4 as uuidv4 } from 'uuid';
import store from '@/store';

// Revamped Header Styles matching our cinematic theme
const headerStyles = (theme) => css`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #000;
  border-bottom: 1px solid #333;
  padding: ${theme.spacing[4]} ${theme.spacing[3]};
`;

const containerStyles = (theme) => css`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logoStyles = (theme) => css`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const munchStyles = (theme) => css`color: #1dbf1d;`; // Signature green
const mStyles = (theme) => css`color: #fedc01;`;         // Signature yellow
const txiStyles = (theme) => css`color: #ffffff;`;         // White for contrast

const navStyles = (theme) => css`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const linkStyles = (theme) => css`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  transition: color 0.2s ease;
  &:hover {
    color: #1dbf1d;
  }
`;

const dropdownButtonStyles = (theme) => css`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
  &:hover {
    color: #fedc01;
  }
`;

const dropdownStyles = (theme) => css`
  position: absolute;
  top: 110%;
  right: 0;
  background-color: #111;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 101;
`;

const dropdownLinkStyles = (theme) => css`
  color: #ffffff;
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #1dbf1d;
    color: #000;
  }
`;

const modalStyles = (theme) => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  z-index: 200;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  color: #333;
`;

const overlayStyles = (theme) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

const inputStyles = (theme) => css`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const buttonStyles = (theme) => css`
  padding: 0.75rem;
  background-color: #1dbf1d;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #fedc01;
    color: #000;
  }
`;

const closeButtonOverrides = (theme) => css`
  background-color: #333;
  margin-top: 0.5rem;
`;

const errorStyles = (theme) => css`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`;

// Motion Variants (unchanged)
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

// ModalForm Component remains unchanged in functionality but with updated styling
const ModalForm = ({ title, onSubmit, onClose, error }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div css={overlayStyles(theme)} onClick={onClose} />
      <form css={modalStyles(theme)} onSubmit={(e) => onSubmit(e, email, password)}>
        <h2
          css={css`
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #333;
          `}
        >
          {title}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          css={inputStyles(theme)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          css={inputStyles(theme)}
          autoComplete="current-password"
        />
        {error && <div css={errorStyles(theme)}>{error}</div>}
        <button type="submit" css={buttonStyles(theme)} disabled={!!error && error.includes('Too many')}>
          Login
        </button>
        <button type="button" onClick={onClose} css={[buttonStyles(theme), closeButtonOverrides(theme)]}>
          Close
        </button>
      </form>
    </>
  );
};

// Header Component with revamped styling
const Header = () => {
  const theme = useTheme();
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
      await new Promise(resolve => setTimeout(resolve, 0));
      const updatedState = store.getState().auth;
      console.log('Redux state after dispatch:', updatedState);

      setLoginModalOpen(false);
      setPartnerModalOpen(null);

      const userRole = updatedState.user?.role || result.user.role;
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
          navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
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
      <motion.header css={headerStyles(theme)} initial="hidden" animate="visible" variants={containerVariants}>
        <div css={containerStyles(theme)}>
          <motion.div variants={itemVariants}>
            <Link to="/" css={logoStyles(theme)}>
              <span css={munchStyles(theme)}>MUNCH</span>
              <span css={mStyles(theme)}>M</span>
              <span css={txiStyles(theme)}>TXI</span>
            </Link>
          </motion.div>
          <motion.nav css={navStyles(theme)} variants={itemVariants}>
            <Link to="/features" css={linkStyles(theme)}>Features</Link>
            <Link to="/contact" css={linkStyles(theme)}>Contact</Link>
            <button onClick={() => setLoginModalOpen(true)} css={linkStyles(theme)}>Login</button>
            <div css={css`position: relative;`}>
              <button onClick={togglePartnerDropdown} css={dropdownButtonStyles(theme)}>
                Partner Login
              </button>
              {partnerDropdownOpen && (
                <motion.div
                  css={dropdownStyles(theme)}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                >
                  <button onClick={() => handlePartnerLoginClick('merchant')} css={dropdownLinkStyles(theme)}>
                    Merchant Login
                  </button>
                  <button onClick={() => handlePartnerLoginClick('staff')} css={dropdownLinkStyles(theme)}>
                    Staff Login
                  </button>
                  <button onClick={() => handlePartnerLoginClick('driver')} css={dropdownLinkStyles(theme)}>
                    Driver Login
                  </button>
                  <button onClick={() => handlePartnerLoginClick('admin')} css={dropdownLinkStyles(theme)}>
                    Admin Login
                  </button>
                </motion.div>
              )}
            </div>
            <Link to="/register" css={linkStyles(theme)}>Sign Up</Link>
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
