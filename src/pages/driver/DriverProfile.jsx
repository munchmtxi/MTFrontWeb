/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import driverProfileApi from '@/api/driver/profile/driverProfileApi';
import { Link } from 'react-router-dom';

// Styles matching DriverDashboard
const pageStyles = css`
  min-height: 100vh;
  background: #1a202c; /* Dark blue-grey background */
  padding: 20px;
  color: #d1d5db; /* Light grey text */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const cardStyles = css`
  background: #2d3748; /* Dark grey cards */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  max-width: 600px; /* Approximation of md container */
  margin-left: auto;
  margin-right: auto;
`;

const headingStyles = css`
  font-size: 24px; /* Approximation of 2xl */
  font-weight: 600;
  color: #fedc01; /* Yellow */
  margin-bottom: 15px;
`;

const infoStyles = css`
  font-size: 14px; /* Approximation of md */
  margin: 10px 0;
  color: #d1d5db;
`;

const buttonStyles = css`
  padding: 10px 20px;
  background: #fedc01; /* Yellow */
  color: #111827;
  border-radius: 20px;
  border: none;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px;
  &:hover {
    background: #d4b501; /* Slightly darker yellow */
  }
`;

const DriverProfile = () => {
  const { data: profile, isLoading, error } = useQuery('driverProfile', driverProfileApi.getProfile);

  if (isLoading) return <div css={{ color: '#d1d5db' }}>Loading...</div>;
  if (error) return <div css={{ color: '#d1d5db' }}>Error: {error.message}</div>;

  return (
    <div css={pageStyles}>
      <div css={cardStyles}>
        <h1 css={headingStyles}>Driver Profile</h1>
        <div css={infoStyles}>Name: {profile?.name}</div>
        <div css={infoStyles}>Email: {profile?.user.email}</div>
        <div css={infoStyles}>Phone: {profile?.phone_number}</div>
        <div css={infoStyles}>
          Vehicle: {profile?.vehicle_info.model} ({profile?.vehicle_info.type}, {profile?.vehicle_info.year})
        </div>
        <Link to="/driver/profile/edit" css={buttonStyles}>Edit Profile</Link>
        <Link to="/driver/profile/password" css={buttonStyles}>Change Password</Link>
      </div>
    </div>
  );
};

export default DriverProfile;