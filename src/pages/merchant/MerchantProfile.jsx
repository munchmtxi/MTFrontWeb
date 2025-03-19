/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { fetchMerchantProfile } from '@/features/merchant/merchantProfileThunks';
import MerchantHeader from '@/components/merchant/MerchantHeader';

// ----- Styles -----
const profileStyles = (theme) => css`
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

const infoStyles = (theme) => css`
  margin-bottom: ${theme.spacing[3]};
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.grayScale[800]};
`;

const labelStyles = (theme) => css`
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.greenScale[700]};
`;

const buttonStyles = (theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${theme.greenScale[500]};
  color: #ffffff;
  text-decoration: none;
  border-radius: ${theme.radii.md};
  display: inline-block;
  &:hover {
    background-color: ${theme.greenScale[400]};
  }
`;

const errorStyles = (theme) => css`
  color: ${theme.grayScale[400]};
  font-size: ${theme.typography.fontSizes.md};
  margin-bottom: ${theme.spacing[3]};
`;

// ----- MerchantProfile Component -----
const MerchantProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { profile, status, error } = useSelector((state) => state.merchantProfile);

  useEffect(() => {
    if (token && user?.role === 'merchant' && status === 'idle') {
      dispatch(fetchMerchantProfile());
    }
  }, [dispatch, token, user, status]);

  if (!token || user?.role !== 'merchant') {
    return <Navigate to="/" replace />;
  }

  if (status === 'loading') {
    return (
      <div css={profileStyles(theme)}>
        <MerchantHeader />
        <div css={containerStyles(theme)}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div css={profileStyles(theme)}>
        <MerchantHeader />
        <div css={containerStyles(theme)}>
          <p>No profile data available.</p>
          {error && <p css={errorStyles(theme)}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div css={profileStyles(theme)}>
      <MerchantHeader />
      <div css={containerStyles(theme)}>
        <h1 css={headingStyles(theme)}>Merchant Profile</h1>
        {error && <p css={errorStyles(theme)}>{error}</p>}
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>Business Name: </span>
          {profile.business_name || 'N/A'}
        </div>
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>Business Type: </span>
          {profile.business_type || 'N/A'}
        </div>
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>Address: </span>
          {profile.address || 'N/A'}
        </div>
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>Phone Number: </span>
          {profile.phone_number || 'N/A'}
        </div>
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>Email: </span>
          {user.email || 'N/A'}
        </div>
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>Business Hours: </span>
          {profile.business_hours
            ? `${profile.business_hours.open || 'N/A'} - ${profile.business_hours.close || 'N/A'}`
            : 'N/A'}
        </div>
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>Currency: </span>
          {profile.currency || 'N/A'}
        </div>
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>Time Zone: </span>
          {profile.time_zone || 'N/A'}
        </div>
        <div css={infoStyles(theme)}>
          <span css={labelStyles(theme)}>WhatsApp Enabled: </span>
          {profile.whatsapp_enabled ? 'Yes' : 'No'}
        </div>
        <Link to="/merchant/profile/edit" css={buttonStyles(theme)}>
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default MerchantProfile;