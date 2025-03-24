/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useQuery } from 'react-query';
import driverProfileApi from '@/api/driver/profile/driverProfileApi';
import DriverHeader from '@/components/driver/DriverHeader';
import { Link } from 'react-router-dom';

const pageStyles = (theme) => css`
  min-height: 100vh;
  background-color: ${theme.grayScale[100]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const cardStyles = (theme) => css`
  ${theme.components.card.baseStyle};
  padding: ${theme.spacing[4]};
  margin-top: ${theme.spacing[6]};
  max-width: ${theme.grid.container.md};
  margin-left: auto;
  margin-right: auto;
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  color: ${theme.components.roles.driver?.primary};
  margin-bottom: ${theme.spacing[4]};
`;

const infoStyles = (theme) => css`
  font-size: ${theme.typography.fontSizes.md};
  margin: ${theme.spacing[2]} 0;
`;

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  margin: ${theme.spacing[2]};
`;

const DriverProfile = () => {
  const theme = useTheme();
  const { data: profile, isLoading, error } = useQuery('driverProfile', driverProfileApi.getProfile);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div css={pageStyles(theme)}>
      <DriverHeader />
      <div css={cardStyles(theme)}>
        <h1 css={headingStyles(theme)}>Driver Profile</h1>
        <div css={infoStyles(theme)}>Name: {profile?.name}</div>
        <div css={infoStyles(theme)}>Email: {profile?.user.email}</div>
        <div css={infoStyles(theme)}>Phone: {profile?.phone_number}</div>
        <div css={infoStyles(theme)}>Vehicle: {profile?.vehicle_info.model} ({profile?.vehicle_info.type}, {profile?.vehicle_info.year})</div>
        <Link to="/driver/profile/edit" css={buttonStyles(theme)}>Edit Profile</Link>
        <Link to="/driver/profile/password" css={buttonStyles(theme)}>Change Password</Link>
      </div>
    </div>
  );
};

export default DriverProfile;