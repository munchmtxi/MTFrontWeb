/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion'; // Ensure this line is exact
import { Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice'; // Adjust path
import theme from '../../styles/theme'; // Adjust path
import { v4 as uuidv4 } from 'uuid';

const headerStyles = css`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: ${theme.colors.main};
  border-bottom: 1px solid ${theme.colors.borderColor};
`;

const modalStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors.darkBg};
  padding: ${theme.spacing(3)};
  border-radius: 8px;
  z-index: 1000;
  width: 90%;
  max-width: 400px;
  box-shadow: ${theme.shadows[2]};
`;

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.overlay};
  z-index: 999;
`;

const navLinkStyles = css`
  color: white;
  &:hover {
    color: ${theme.colors.primary};
  }
`;

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);
    try {
      // Optionally, add a deviceId if needed
      const result = await dispatch(login({ email, password })).unwrap();
      setModalOpen(false);
      if (result.user.role === 'merchant') {
        navigate('/merchant/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.header
        css={headerStyles}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              css={{
                fontSize: theme.typography.fontSizes[4],
                fontWeight: theme.typography.fontWeights.bold,
                color: theme.colors.primary,
              }}
            >
              Munch Mtxi
            </Link>
          </div>
          <motion.nav className="hidden md:flex space-x-6" variants={itemVariants}>
            <Link to="/" css={navLinkStyles}>
              Home
            </Link>
            <Link to="/features" css={navLinkStyles}>
              Features
            </Link>
            <Link to="/contact" css={navLinkStyles}>
              Contact
            </Link>
            <button onClick={() => setModalOpen(true)} css={navLinkStyles}>
              Login
            </button>
            <Link
              to="/register"
              css={{
                color: theme.colors.primary,
                fontWeight: theme.typography.fontWeights.bold,
                '&:hover': { color: theme.colors.success },
              }}
            >
              Sign Up
            </Link>
          </motion.nav>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} css={{ color: theme.colors.primary }} />
          </button>
          {menuOpen && (
            <nav
              className="absolute top-full left-0 w-full md:hidden px-6 py-4"
              css={{ backgroundColor: theme.colors.main }}
            >
              <Link to="/" className="block py-2" css={navLinkStyles}>
                Home
              </Link>
              <Link to="/features" className="block py-2" css={navLinkStyles}>
                Features
              </Link>
              <Link to="/contact" className="block py-2" css={navLinkStyles}>
                Contact
              </Link>
              <button
                onClick={() => setModalOpen(true)}
                className="block py-2 w-full text-left"
                css={navLinkStyles}
              >
                Login
              </button>
              <Link
                to="/register"
                className="block py-2"
                css={{
                  color: theme.colors.primary,
                  fontWeight: theme.typography.fontWeights.bold,
                  '&:hover': { color: theme.colors.success },
                }}
              >
                Sign Up
              </Link>
            </nav>
          )}
        </div>
      </motion.header>

      {modalOpen && (
        <>
          <div css={overlayStyles} onClick={() => setModalOpen(false)} />
          <form css={modalStyles} onSubmit={handleLogin}>
            <h2
              css={{
                fontSize: theme.typography.fontSizes[3],
                fontWeight: theme.typography.fontWeights.bold,
                marginBottom: theme.spacing(2),
                color: theme.colors.primary,
              }}
            >
              Login
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              css={{
                width: '100%',
                padding: theme.spacing(1),
                marginBottom: theme.spacing(2),
                backgroundColor: '#2d2d2d',
                color: theme.colors.lightText,
                border: 'none',
                borderRadius: '4px',
              }}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              css={{
                width: '100%',
                padding: theme.spacing(1),
                marginBottom: theme.spacing(2),
                backgroundColor: '#2d2d2d',
                color: theme.colors.lightText,
                border: 'none',
                borderRadius: '4px',
              }}
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={isLoading}
              css={{
                padding: theme.spacing(1.5),
                backgroundColor: theme.colors.primary,
                color: theme.colors.lightText,
                borderRadius: '4px',
                width: '100%',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              css={{
                marginTop: theme.spacing(1),
                color: theme.colors.muted,
                width: '100%',
                textAlign: 'center',
              }}
            >
              Close
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Header;
