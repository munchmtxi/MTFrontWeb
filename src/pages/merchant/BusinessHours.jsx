/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { updateBusinessHoursThunk } from '@/features/merchant/merchantProfileThunks'; // Updated import
import MerchantHeader from '@/components/merchant/MerchantHeader';

// ----- Styles -----
const pageStyles = (theme) => css`
  min-height: 100vh;
  background-color: ${theme.grayScale[100]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const containerStyles = (theme) => css`
  max-width: ${theme.breakpoints.lg};
  margin: 0 auto;
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  color: ${theme.greenScale[700]};
  margin-bottom: ${theme.spacing[4]};
`;

const inputStyles = (theme) => css`
  width: 100%;
  padding: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[3]};
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.grayScale[300]};
  font-size: ${theme.typography.fontSizes.md};
`;

const buttonStyles = (theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${theme.greenScale[500]};
  color: #ffffff;
  border: none;
  border-radius: ${theme.radii.md};
  cursor: pointer;
  &:hover {
    background-color: ${theme.greenScale[400]};
  }
`;

const errorStyles = (theme) => css`
  color: ${theme.grayScale[400]};
  font-size: ${theme.typography.fontSizes.md};
  margin-bottom: ${theme.spacing[3]};
`;

// ----- BusinessHours Component -----
const BusinessHours = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { profile, status, error } = useSelector((state) => state.merchantProfile);
  const [hours, setHours] = useState(profile?.businessHours || '');

  if (!token || user?.role !== 'merchant') {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setHours(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBusinessHoursThunk({ businessHours: hours })); // Updated to use thunk
  };

  return (
    <div css={pageStyles(theme)}>
      <MerchantHeader />
      <div css={containerStyles(theme)}>
        <h1 css={headingStyles(theme)}>Business Hours</h1>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p css={errorStyles(theme)}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            css={inputStyles(theme)}
            type="text"
            value={hours}
            onChange={handleChange}
            placeholder="e.g., Mon-Fri 9 AM - 5 PM"
          />
          <button css={buttonStyles(theme)} type="submit">
            Update Hours
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessHours;