/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';
import Header from '@/components/common/Header';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

const registerPageStyles = css`
  min-height: 100vh;
  background-color: ${theme.components.card.baseStyle.backgroundColor};
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const mainStyles = css`
  flex: 1;
  padding: ${theme.spacing[12]} ${theme.spacing[6]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const formContainerStyles = css`
  max-width: ${theme.grid.container.sm};
  width: 100%;
  padding: ${theme.spacing[6]};
  background-color: ${theme.components.card.variants.filled.backgroundColor};
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
`;

const headingStyles = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['4xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  margin-bottom: ${theme.spacing[6]};
  text-align: center;
  color: ${greenScale[400]};
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const inputStyles = css`
  ${theme.components.input.baseStyle};
  width: 100%;
  font-size: ${theme.typography.fontSizes.md};
`;

const selectStyles = css`
  ${theme.components.input.baseStyle};
  width: 100%;
  font-size: ${theme.typography.fontSizes.md};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 6.344C1.875 5.768 2.32 4.8 3.104 4.8h9.792c0.784 0 1.229 0.968 0.653 1.544L8.753 11.14a0.75 0.75 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing[2]} center;
`;

const buttonStyles = css`
  ${theme.components.button.baseStyle};
  background-color: ${greenScale[600]};
  color: #fff;
  font-size: ${theme.components.button.sizes.md.fontSize};
  padding: ${theme.components.button.sizes.md.padding};
  border-radius: ${theme.components.button.baseStyle.borderRadius};
  margin-top: ${theme.spacing[4]};
  &:hover {
    background-color: ${greenScale[700]};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.sm};
  }
  &:active {
    background-color: ${greenScale[800]};
    transform: translateY(0);
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    address: '',
    role_id: 1, // Assuming role_id 1 is for customers; adjust as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call to submit data here
  };

  return (
    <div css={registerPageStyles}>
      <Header />
      <main css={mainStyles}>
        <div css={formContainerStyles}>
          <h1 css={headingStyles}>Create Your Customer Account</h1>
          <form css={formStyles} onSubmit={handleSubmit}>
            {/* First Name */}
            <input
              css={inputStyles}
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
              minLength={2}
              maxLength={50}
            />

            {/* Last Name */}
            <input
              css={inputStyles}
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
              minLength={2}
              maxLength={50}
            />

            {/* Email */}
            <input
              css={inputStyles}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            {/* Password */}
            <input
              css={inputStyles}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength={8}
              maxLength={100}
            />

            {/* Phone */}
            <input
              css={inputStyles}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (e.g., +265123456789)"
              required
            />

            {/* Country */}
            <select
              css={selectStyles}
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              <option value="malawi">Malawi</option>
              <option value="zambia">Zambia</option>
              <option value="mozambique">Mozambique</option>
              <option value="tanzania">Tanzania</option>
            </select>

            {/* Address */}
            <input
              css={inputStyles}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Physical Address"
              required
            />

            {/* Submit Button */}
            <button css={buttonStyles} type="submit">
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;