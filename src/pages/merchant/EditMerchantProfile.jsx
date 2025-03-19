/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { fetchMerchantProfile, updateMerchantProfileThunk } from '@/features/merchant/merchantProfileThunks';
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

const linkStyles = (theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${theme.grayScale[400]};
  color: #ffffff;
  text-decoration: none;
  border-radius: ${theme.radii.md};
  display: inline-block;
  margin-left: ${theme.spacing[2]};
  &:hover {
    background-color: ${theme.grayScale[500]};
  }
`;

const errorStyles = (theme) => css`
  color: ${theme.grayScale[400]};
  font-size: ${theme.typography.fontSizes.md};
  margin-bottom: ${theme.spacing[3]};
`;

const successStyles = (theme) => css`
  color: ${theme.greenScale[600]};
  font-size: ${theme.typography.fontSizes.md};
  margin-bottom: ${theme.spacing[3]};
`;

// ----- EditMerchantProfile Component -----
const EditMerchantProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { profile, status, error } = useSelector((state) => state.merchantProfile);
  const [formData, setFormData] = useState({
    business_name: profile?.business_name || '',
    address: profile?.address || '',
    phone_number: profile?.phone_number || '',
    business_type: profile?.business_type || '',
    currency: profile?.currency || 'USD',
    time_zone: profile?.time_zone || 'UTC',
    whatsapp_enabled: profile?.whatsapp_enabled ?? true,
  });
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (token && user?.role === 'merchant' && status === 'idle') {
      dispatch(fetchMerchantProfile());
    }
  }, [dispatch, token, user, status]);

  useEffect(() => {
    if (profile) {
      setFormData({
        business_name: profile.business_name || '',
        address: profile.address || '',
        phone_number: profile.phone_number || '',
        business_type: profile.business_type || '',
        currency: profile.currency || 'USD',
        time_zone: profile.time_zone || 'UTC',
        whatsapp_enabled: profile.whatsapp_enabled ?? true,
      });
    }
  }, [profile]);

  if (!token || user?.role !== 'merchant') {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateMerchantProfileThunk(formData)).unwrap();
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000); // Clear after 3s
    } catch (err) {
      // Error is already in Redux state, no need to set it here
    }
  };

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

  return (
    <div css={profileStyles(theme)}>
      <MerchantHeader />
      <div css={containerStyles(theme)}>
        <h1 css={headingStyles(theme)}>Edit Merchant Profile</h1>
        {error && <p css={errorStyles(theme)}>{error}</p>}
        {successMessage && <p css={successStyles(theme)}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            css={inputStyles(theme)}
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            placeholder="Business Name"
          />
          <input
            css={inputStyles(theme)}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            css={inputStyles(theme)}
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <select
            css={inputStyles(theme)}
            name="business_type"
            value={formData.business_type}
            onChange={handleChange}
          >
            <option value="">Select Business Type</option>
            <option value="grocery">Grocery</option>
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Cafe</option>
            <option value="bakery">Bakery</option>
            <option value="butcher">Butcher</option>
          </select>
          <input
            css={inputStyles(theme)}
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            placeholder="Currency (e.g., USD)"
          />
          <input
            css={inputStyles(theme)}
            type="text"
            name="time_zone"
            value={formData.time_zone}
            onChange={handleChange}
            placeholder="Time Zone (e.g., UTC)"
          />
          <label>
            <input
              type="checkbox"
              name="whatsapp_enabled"
              checked={formData.whatsapp_enabled}
              onChange={handleChange}
            />
            Enable WhatsApp
          </label>
          <div>
            <button css={buttonStyles(theme)} type="submit">
              Save Changes
            </button>
            <Link to="/merchant/profile" css={linkStyles(theme)}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMerchantProfile;