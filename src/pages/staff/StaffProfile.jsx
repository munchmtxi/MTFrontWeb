/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffProfile } from '@/features/staff/profile/staffProfileThunks';

// Styles
const containerStyles = (theme) => css`
  padding: ${theme.spacing[4]};
  max-width: 800px;
  margin: 0 auto;
`;

const profileCardStyles = (theme) => css`
  background-color: ${theme.grayScale[50]};
  padding: ${theme.spacing[3]};
  border-radius: ${theme.radii?.md || '0.375rem'}; // Fix: Use radii.md with fallback
  box-shadow: ${theme.shadows.sm};
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes.xl};
  margin-bottom: ${theme.spacing[3]};
`;

const StaffProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.staffProfile);

  console.log('StaffProfile theme:', theme); // Debug theme

  useEffect(() => {
    dispatch(fetchStaffProfile());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return null;

  return (
    <div css={containerStyles(theme)}>
      <h2 css={headingStyles(theme)}>Staff Profile</h2>
      <div css={profileCardStyles(theme)}>
        <p><strong>Name:</strong> {profile.user.first_name} {profile.user.last_name}</p>
        <p><strong>Email:</strong> {profile.user.email}</p>
        <p><strong>Phone:</strong> {profile.user.phone || 'Not set'}</p>
        <p><strong>Position:</strong> {profile.position}</p>
        <p><strong>Merchant ID:</strong> {profile.merchant_id}</p>
        <p><strong>Created At:</strong> {new Date(profile.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StaffProfile;