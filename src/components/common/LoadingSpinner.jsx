/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';

// Define the spinning animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Define spinner styles without theme dependencies
const spinnerStyles = css`
  height: 32px; /* Equivalent to theme.spacing[8], assuming 1 unit = 4px */
  width: 32px;
  border: 4px solid #10b981; /* Green color, replacing greenScale[500] */
  border-radius: 9999px; /* Full circle, replacing theme.radii.full */
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => {
  return <div css={spinnerStyles}></div>;
};

export default LoadingSpinner;