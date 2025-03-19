/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinnerStyles = css`
  height: ${theme.spacing[8]};
  width: ${theme.spacing[8]};
  border: 4px solid ${greenScale[500]};
  border-radius: ${theme.radii.full};
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => {
  return <div css={spinnerStyles}></div>;
};

export default LoadingSpinner;