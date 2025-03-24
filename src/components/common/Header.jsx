/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/features/auth/authThunks';
import { staffLogin } from '@/features/auth/staffAuthThunks';
import { v4 as uuidv4 } from 'uuid';
import store from '@/store'; // Import store for direct state access

// Styles
const headerStyles = (theme) => css`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: ${theme.components.card.baseStyle.backgroundColor};
  padding: ${theme.spacing[4]} ${theme.spacing[3]};
  color: ${theme.components.roles.customer.primary};
`;

const containerStyles = (theme) => css`
  max-width: ${theme.breakpoints.lg};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logoStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
`;

const munchStyles = (theme) => css`color: ${theme.components.roles.customer.primary};`;
const mStyles = (theme) => css`color: ${theme.components.roles.customer.secondary};`;
const txiStyles = (theme) => css`color: #ffffff;`;

const navStyles = (theme) => css`
  display: flex;
  gap: ${theme.spacing[3]};
  align-items: center;
`;

const linkStyles = (theme) => css`
  color: #ffffff;
  text-decoration: none;
  font-size: ${theme.typography.fontSizes.md};
  font-family: ${theme.typography.fonts.heading};
  transition: color 0.15s ${theme.transitions.timing.easeOut};
  &:hover {
    color: ${theme.components.roles.customer.primary};
    text-decoration: underline;
  }
`;

const dropdownButtonStyles = (theme) => css`
  background: none;
  border: none;
  color: #ffffff;
  font-size: ${theme.typography.fontSizes.md};
  font-family: ${theme.typography.fonts.heading};
  cursor: pointer;
  padding: 0;
  transition: color 0.15s ${theme.transitions.timing.easeOut};
  &:hover {
    color: ${theme.components.roles.customer.primary};
    text-decoration: underline;
  }
`;

const dropdownStyles = (theme) => css`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${theme.components.card.baseStyle.backgroundColor};
  border-radius: ${theme.radii.sm};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing[2]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[1]};
  z-index: ${theme.zIndices.dropdown};
`;

const dropdownLinkStyles = (theme) => css`
  color: #ffffff;
  text-decoration: none;
  font-size: ${theme.typography.fontSizes.sm};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  transition: background-color 0.15s ${theme.transitions.timing.easeOut};
  &:hover {
    background-color: ${theme.components.button.variants.primary.backgroundColor};
    color: ${theme.components.roles.customer.primary};
  }
`;

const modalStyles = (theme) => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.components.modal.baseStyle.dialog.backgroundColor};
  padding: ${theme.spacing[3]};
  border-radius: ${theme.radii.md};
  z-index: ${theme.zIndices.modal};
  width: 90%;
  max-width: 400px;
  box-shadow: ${theme.shadows.lg};
  color: ${theme.components.roles.customer.primary};
`;

const overlayStyles = (theme) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.components.modal.baseStyle.overlay.backgroundColor};
  z-index: ${theme.zIndices.overlay};
`;

const inputStyles = (theme) => css`
  width: 100%;
  padding: ${theme.spacing[1]};
  margin-bottom: ${theme.spacing[2]};
  background-color: ${theme.components.input.baseStyle.backgroundColor};
  color: ${theme.components.input.baseStyle.color};
  border: 1px solid ${theme.components.input.baseStyle.borderColor};
  border-radius: ${theme.radii.sm};
`;

const buttonStyles = (theme) => css`
  padding: ${theme.spacing[1.5]};
  background-color: ${theme.components.button.variants.primary.backgroundColor};
  color: ${theme.components.button.variants.primary.color};
  border-radius: ${theme.radii.sm};
  width: 100%;
  text-align: center;
  transition: background-color 0.15s ${theme.transitions.timing.easeOut};
  &:hover {
    background-color: ${theme.components.button.variants.primary._hover.backgroundColor};
  }
`;

const closeButtonOverrides = (theme) => css`
  background-color: ${theme.components.button.variants.secondary.backgroundColor};
  margin-top: ${theme.spacing[1]};
`;

const errorStyles = (theme) => css`
  color: red;
  font-size: ${theme.typography.fontSizes.sm};
  margin-top: ${theme.spacing[1]};
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
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div css={overlayStyles(theme)} onClick={onClose} />
      <form css={modalStyles(theme)} onSubmit={(e) => onSubmit(e, email, password)}>
        <h2
          css={css`
            font-size: ${theme.typography.fontSizes.xl};
            font-weight: ${theme.typography.fontWeights.bold};
            margin-bottom: ${theme.spacing[2]};
            color: ${theme.components.roles.customer.primary};
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

// Header Component
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
      if (role === 'merchant') {
        const credentials = { email, password, deviceId, deviceType };
        result = await dispatch(login(credentials)).unwrap();
      } else {
        const credentials = { email, password };
        result = await dispatch(staffLogin(credentials)).unwrap();
      }
      console.log('Login result:', result);

      // Ensure state updates before proceeding
      await new Promise(resolve => setTimeout(resolve, 0));
      const updatedState = store.getState().auth;
      console.log('Redux state after dispatch:', updatedState);

      setLoginModalOpen(false);
      setPartnerModalOpen(null);

      const userRole = updatedState.user?.role || result.user.role;
      switch (userRole) {
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
      setLoginError(error.message || 'Login failed');
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
          title="Login"
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