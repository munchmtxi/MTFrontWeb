/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBusinessType, updateBusinessType } from '@/features/merchant/businessTypeThunks';
import businessTypeApi from '@/api/merchant/businessTypeApi';
import MerchantHeader from '@/components/merchant/MerchantHeader';
import Footer from '@/components/common/Footer';
import { greenScale } from '@/styles/themeTokens';

// Styles
const sectionStyles = (theme) => css`
  padding: ${theme.spacing[20]} ${theme.spacing[4]};
  background-color: ${theme.grayScale[100]};
  min-height: 100vh;
`;

const titleStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['5xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.greenScale[700]};
  text-align: center;
  margin-bottom: ${theme.spacing[12]};
`;

const formStyles = (theme) => css`
  max-width: ${theme.breakpoints.md};
  margin: 0 auto;
  background-color: #ffffff;
  padding: ${theme.spacing[6]};
  border-radius: ${theme.radii.md};
  box-shadow: ${theme.shadows.sm};
`;

const inputStyles = (theme) => css`
  width: 100%;
  padding: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
  border: 1px solid ${theme.grayScale[300]};
  border-radius: ${theme.radii.sm};
  font-size: ${theme.typography.fontSizes.md};
`;

const checkboxStyles = (theme) => css`
  margin-right: ${theme.spacing[2]};
`;

const labelStyles = (theme) => css`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.md};
`;

const buttonStyles = (theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${greenScale[600]};
  color: #fff;
  border: none;
  border-radius: ${theme.radii.sm};
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.typography.fontSizes.lg};
  cursor: pointer;
  transition: background-color 0.15s ${theme.transitions.timing.easeOut};
  &:hover {
    background-color: ${greenScale[700]};
  }
`;

const errorStyles = (theme) => css`
  color: #ff4d4d;
  text-align: center;
  margin-top: ${theme.spacing[2]};
`;

const BusinessTypeSettings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { businessType, businessTypeDetails, loading, error } = useSelector((state) => state.businessType);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    business_type: businessType || '',
    business_type_details: businessTypeDetails || {},
  });
  const [allowedServiceTypes, setAllowedServiceTypes] = useState([]);

  useEffect(() => {
    if (user?.role === 'merchant') {
      dispatch(fetchBusinessType());
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFormData({
      business_type: businessType || '',
      business_type_details: businessTypeDetails || {},
    });
    // Fetch allowed service types when business_type changes
    if (businessType) {
      fetchAllowedServiceTypes(businessType);
    }
  }, [businessType, businessTypeDetails]);

  const fetchAllowedServiceTypes = async (type) => {
    try {
      const requirements = await businessTypeApi.getBusinessTypeRequirements(type);
      setAllowedServiceTypes(requirements.allowedServiceTypes || []);
    } catch (err) {
      console.error('Failed to fetch service types:', err);
      setAllowedServiceTypes([]);
    }
  };

  const handleBusinessTypeChange = async (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      business_type: value,
      business_type_details: {}, // Reset details when type changes
    }));
    if (value) {
      await fetchAllowedServiceTypes(value);
    } else {
      setAllowedServiceTypes([]);
    }
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      business_type_details: {
        ...prev.business_type_details,
        [name]: value.split(',').map((item) => item.trim()),
      },
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      business_type_details: {
        ...prev.business_type_details,
        [name]: value ? parseInt(value, 10) : undefined,
      },
    }));
  };

  const handleServiceTypeChange = (serviceType) => (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => {
      const currentServiceTypes = prev.business_type_details.service_types || [];
      const updatedServiceTypes = isChecked
        ? [...currentServiceTypes, serviceType]
        : currentServiceTypes.filter((type) => type !== serviceType);
      return {
        ...prev,
        business_type_details: {
          ...prev.business_type_details,
          service_types: updatedServiceTypes,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBusinessType(formData));
  };

  if (!user || user.role !== 'merchant') {
    return <div>Please log in as a merchant to access this page.</div>;
  }

  return (
    <>
      <MerchantHeader />
      <main>
        <section css={sectionStyles(theme)}>
          <motion.h1
            css={titleStyles(theme)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Business Type Settings
          </motion.h1>
          <form css={formStyles(theme)} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="business_type">Business Type</label>
              <select
                id="business_type"
                name="business_type"
                value={formData.business_type}
                onChange={handleBusinessTypeChange}
                css={inputStyles(theme)}
                disabled={loading}
              >
                <option value="">Select a type</option>
                <option value="restaurant">Restaurant</option>
                <option value="grocery">Grocery</option>
                <option value="cafe">Cafe</option>
                <option value="bakery">Bakery</option>
                <option value="butcher">Butcher</option>
              </select>
            </div>

            {formData.business_type === 'restaurant' && (
              <div>
                <label htmlFor="cuisine_type">Cuisine Type (comma-separated)</label>
                <input
                  id="cuisine_type"
                  name="cuisine_type"
                  value={formData.business_type_details.cuisine_type?.join(', ') || ''}
                  onChange={handleDetailsChange}
                  css={inputStyles(theme)}
                  placeholder="e.g., italian, mexican"
                  disabled={loading}
                />
              </div>
            )}

            {formData.business_type && (
              <>
                <div>
                  <label htmlFor="seating_capacity">Seating Capacity</label>
                  <input
                    id="seating_capacity"
                    name="seating_capacity"
                    type="number"
                    value={formData.business_type_details.seating_capacity || ''}
                    onChange={handleNumberChange}
                    css={inputStyles(theme)}
                    disabled={loading}
                  />
                </div>
                {allowedServiceTypes.length > 0 && (
                  <div>
                    <label>Service Types</label>
                    {allowedServiceTypes.map((type) => (
                      <div key={type} css={labelStyles(theme)}>
                        <input
                          type="checkbox"
                          id={type}
                          checked={formData.business_type_details.service_types?.includes(type) || false}
                          onChange={handleServiceTypeChange(type)}
                          css={checkboxStyles(theme)}
                          disabled={loading}
                        />
                        <label htmlFor={type}>{type.replace('_', ' ').toUpperCase()}</label>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <button type="submit" css={buttonStyles(theme)} disabled={loading}>
              {loading ? 'Updating...' : 'Update Business Type'}
            </button>

            {error && <p css={errorStyles(theme)}>Error: {error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BusinessTypeSettings;