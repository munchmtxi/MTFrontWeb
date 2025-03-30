/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';
import Header from '@/components/common/Header';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

// Full-page container with a cinematic black backdrop
const registerPageStyles = css`
  min-height: 100vh;
  background-color: #000;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
`;

// Center the form vertically and horizontally
const mainStyles = css`
  flex: 1;
  padding: ${theme.spacing[12]} ${theme.spacing[6]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Form container with dark, cinematic styling
const formContainerStyles = css`
  max-width: 480px;
  width: 100%;
  padding: ${theme.spacing[6]};
  background-color: #111;
  border-radius: ${theme.radii.lg};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
`;

// Bold heading using our signature colors
const headingStyles = css`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing[6]};
  text-align: center;
  color: ${greenScale[400]};
`;

// Form layout with proper spacing
const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

// Dark-themed input with modern styling
const inputStyles = css`
  width: 100%;
  padding: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.md};
  border: 1px solid #333;
  border-radius: ${theme.radii.sm};
  background-color: #222;
  color: #e0e0e0;
  &::placeholder {
    color: #777;
  }
`;

// Dark-themed select styled to match inputs
const selectStyles = css`
  width: 100%;
  padding: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.md};
  border: 1px solid #333;
  border-radius: ${theme.radii.sm};
  background-color: #222;
  color: #e0e0e0;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23e0e0e0' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 6.344C1.875 5.768 2.32 4.8 3.104 4.8h9.792c0.784 0 1.229 0.968 0.653 1.544L8.753 11.14a0.75 0.75 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing[2]} center;
`;

// Bold, modern button with signature hues
const buttonStyles = css`
  width: 100%;
  padding: ${theme.components.button.sizes.md.padding};
  font-size: ${theme.components.button.sizes.md.fontSize};
  background-color: ${greenScale[600]};
  color: #fff;
  border: none;
  border-radius: ${theme.components.button.baseStyle.borderRadius};
  margin-top: ${theme.spacing[4]};
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: ${greenScale[700]};
    transform: translateY(-2px);
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
    // API call to submit registration data goes here
  };

  return (
    <div css={registerPageStyles}>
      <Header />
      <main css={mainStyles}>
        <div css={formContainerStyles}>
          <h1 css={headingStyles}>Create Your Customer Account</h1>
          <form css={formStyles} onSubmit={handleSubmit}>
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
            <input
              css={inputStyles}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
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
            <input
              css={inputStyles}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (e.g., +265123456789)"
              required
            />
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
            <input
              css={inputStyles}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Physical Address"
              required
            />
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
