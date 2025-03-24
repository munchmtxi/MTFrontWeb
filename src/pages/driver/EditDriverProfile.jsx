/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'; // Add useEffect
import { css, useTheme } from '@emotion/react';
import { useMutation, useQuery } from 'react-query';
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

const EditDriverProfile = () => {
  const theme = useTheme();
  const { data: profile, isLoading } = useQuery('driverProfile', driverProfileApi.getProfile);
  const [formData, setFormData] = useState({});

  const mutation = useMutation((data) => 
    Promise.all([
      driverProfileApi.updatePersonalInfo({ phone: data.phone }),
      driverProfileApi.updateVehicleInfo({ type: data.vehicleType, model: data.vehicleModel, year: data.vehicleYear })
    ])
  );

  useEffect(() => {
    if (profile) {
      setFormData({
        phone: profile.phone_number,
        vehicleType: profile.vehicle_info.type,
        vehicleModel: profile.vehicle_info.model,
        vehicleYear: profile.vehicle_info.year,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onSuccess: () => alert('Profile updated successfully'),
      onError: (error) => alert(`Error: ${error.message}`),
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div css={pageStyles(theme)}>
      <DriverHeader />
      <form css={formStyles(theme)} onSubmit={handleSubmit}>
        <h1 css={headingStyles(theme)}>Edit Driver Profile</h1>
        <input
          css={inputStyles(theme)}
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          css={inputStyles(theme)}
          name="vehicleType"
          value={formData.vehicleType || ''}
          onChange={handleChange}
          placeholder="Vehicle Type"
        />
        <input
          css={inputStyles(theme)}
          name="vehicleModel"
          value={formData.vehicleModel || ''}
          onChange={handleChange}
          placeholder="Vehicle Model"
        />
        <input
          css={inputStyles(theme)}
          name="vehicleYear"
          value={formData.vehicleYear || ''}
          onChange={handleChange}
          placeholder="Vehicle Year"
        />
        <button type="submit" css={buttonStyles(theme)} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditDriverProfile;