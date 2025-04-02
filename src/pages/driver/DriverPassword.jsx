/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useMutation } from 'react-query';
import driverProfileApi from '@/api/driver/profile/driverProfileApi';

// Styles matching DriverDashboard
const pageStyles = css`
  min-height: 100vh;
  background: #1a202c; /* Dark blue-grey background */
  padding: 20px;
  color: #d1d5db; /* Light grey text */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const formStyles = css`
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
  &:hover {
    background: #d4b501; /* Slightly darker yellow */
  }
  &:disabled {
    background: #6b7280; /* Grey for disabled state */
    cursor: not-allowed;
  }
`;

const DriverPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const mutation = useMutation(driverProfileApi.changePassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onSuccess: () => alert('Password changed successfully'),
      onError: (error) => alert(`Error: ${error.message}`),
    });
  };

  return (
    <div css={pageStyles}>
      <form css={formStyles} onSubmit={handleSubmit}>
        <h1 css={headingStyles}>Change Password</h1>
        <input
          css={inputStyles}
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
        />
        <input
          css={inputStyles}
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit" css={buttonStyles} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Saving...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default DriverPassword;