/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useMutation, useQuery } from 'react-query';
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

const EditDriverProfile = () => {
  const { data: profile, isLoading } = useQuery('driverProfile', driverProfileApi.getProfile);
  const [formData, setFormData] = useState({});

  const mutation = useMutation((data) =>
    Promise.all([
      driverProfileApi.updatePersonalInfo({ phone: data.phone }),
      driverProfileApi.updateVehicleInfo({ type: data.vehicleType, model: data.vehicleModel, year: data.vehicleYear }),
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

  if (isLoading) return <div css={{ color: '#d1d5db' }}>Loading...</div>;

  return (
    <div css={pageStyles}>
      <form css={formStyles} onSubmit={handleSubmit}>
        <h1 css={headingStyles}>Edit Driver Profile</h1>
        <input
          css={inputStyles}
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          css={inputStyles}
          name="vehicleType"
          value={formData.vehicleType || ''}
          onChange={handleChange}
          placeholder="Vehicle Type"
        />
        <input
          css={inputStyles}
          name="vehicleModel"
          value={formData.vehicleModel || ''}
          onChange={handleChange}
          placeholder="Vehicle Model"
        />
        <input
          css={inputStyles}
          name="vehicleYear"
          value={formData.vehicleYear || ''}
          onChange={handleChange}
          placeholder="Vehicle Year"
        />
        <button type="submit" css={buttonStyles} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditDriverProfile;