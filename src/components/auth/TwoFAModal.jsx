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

const TwoFAModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await authApi.verify2FA(data);
      onClose();
    } catch (error) {
      console.error('2FA failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div css={overlayStyles}>
      <div css={modalStyles}>
        <button css={closeButtonStyles} onClick={onClose}>
          ×
        </button>
        <h2 css={headingStyles}>Two-Factor Authentication</h2>
        <form css={formStyles} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('code', { required: true })}
            css={inputStyles}
            placeholder="Enter 2FA Code"
          />
          <button css={buttonStyles} type="submit">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFAModal;