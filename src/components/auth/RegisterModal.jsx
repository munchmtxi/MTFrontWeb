/** @jsxImportSource @emotion/react */
import React from 'react';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';
import authApi from '../../api/auth/authApi';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

const overlayStyles = css`
  position: fixed;
  inset: 0;
  background-color: ${theme.components.modal.baseStyle.overlay.backgroundColor};
  backdrop-filter: ${theme.components.modal.baseStyle.overlay.backdropFilter};
  z-index: ${theme.components.modal.baseStyle.overlay.zIndex};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalStyles = css`
  background-color: ${theme.components.modal.baseStyle.dialog.backgroundColor};
  padding: ${theme.components.modal.baseStyle.body.padding};
  border-radius: ${theme.components.modal.baseStyle.dialog.borderRadius};
  box-shadow: ${theme.components.modal.baseStyle.dialog.boxShadow};
  max-width: ${theme.grid.container.sm};
  width: 100%;
  position: relative;
  overflow-y: auto;
  max-height: 90vh;
`;

const headingStyles = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['3xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${greenScale[400]};
  margin-bottom: ${theme.spacing[6]};
  text-align: center;
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

const closeButtonStyles = css`
  ${theme.components.button.baseStyle};
  background-color: transparent;
  color: ${theme.components.modal.baseStyle.closeButton.color};
  padding: ${theme.components.modal.baseStyle.closeButton.padding};
  position: ${theme.components.modal.baseStyle.closeButton.position};
  top: ${theme.components.modal.baseStyle.closeButton.top};
  right: ${theme.components.modal.baseStyle.closeButton.right};
  border-radius: ${theme.components.modal.baseStyle.closeButton.borderRadius};
  &:hover {
    background-color: ${theme.components.modal.baseStyle.closeButton._hover.backgroundColor};
    color: ${theme.components.modal.baseStyle.closeButton._hover.color};
  }
  &:active {
    background-color: ${theme.components.modal.baseStyle.closeButton._active.backgroundColor};
  }
`;

const RegisterModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
      country: '',
      address: '',
      role_id: 1, // Assuming role_id 1 is for customers; adjust as needed
    },
  });

  const onSubmit = async (data) => {
    try {
      await authApi.register(data);
      onClose();
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div css={overlayStyles}>
      <div css={modalStyles}>
        <button css={closeButtonStyles} onClick={onClose}>
          ×
        </button>
        <h2 css={headingStyles}>Create Your Customer Account</h2>
        <form css={formStyles} onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <input
            {...register('first_name', { required: true, minLength: 2, maxLength: 50 })}
            css={inputStyles}
            placeholder="First Name"
          />

          {/* Last Name */}
          <input
            {...register('last_name', { required: true, minLength: 2, maxLength: 50 })}
            css={inputStyles}
            placeholder="Last Name"
          />

          {/* Email */}
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            css={inputStyles}
            placeholder="Email"
            type="email"
          />

          {/* Password */}
          <input
            {...register('password', { required: true, minLength: 8, maxLength: 100 })}
            css={inputStyles}
            type="password"
            placeholder="Password"
          />

          {/* Phone */}
          <input
            {...register('phone', { required: true })}
            css={inputStyles}
            placeholder="Phone Number (e.g., +265123456789)"
            type="tel"
          />

          {/* Country */}
          <select
            {...register('country', { required: true })}
            css={selectStyles}
          >
            <option value="">Select Country</option>
            <option value="malawi">Malawi</option>
            <option value="zambia">Zambia</option>
            <option value="mozambique">Mozambique</option>
            <option value="tanzania">Tanzania</option>
          </select>

          {/* Address */}
          <input
            {...register('address', { required: true })}
            css={inputStyles}
            placeholder="Physical Address"
          />

          {/* Submit Button */}
          <button css={buttonStyles} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;