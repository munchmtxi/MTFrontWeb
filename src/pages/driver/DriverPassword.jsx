/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useMutation } from 'react-query';
import driverProfileApi from '@/api/driver/profile/driverProfileApi';
import DriverHeader from '@/components/driver/DriverHeader';

const pageStyles = (theme) => css`
  min-height: 100vh;
  background-color: ${theme.grayScale[100]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const formStyles = (theme) => css`
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

const inputStyles = (theme) => css`
  ${theme.components.input.baseStyle};
  ${theme.components.input.sizes.md};
  display: block;
  width: 100%;
  margin-bottom: ${theme.spacing[3]};
`;

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  margin-top: ${theme.spacing[2]};
`;

const DriverPassword = () => {
  const theme = useTheme();
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
    <div css={pageStyles(theme)}>
      <DriverHeader />
      <form css={formStyles(theme)} onSubmit={handleSubmit}>
        <h1 css={headingStyles(theme)}>Change Password</h1>
        <input
          css={inputStyles(theme)}
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
        />
        <input
          css={inputStyles(theme)}
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit" css={buttonStyles(theme)} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Saving...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default DriverPassword;