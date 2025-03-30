/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';

const theme = getResponsiveTheme('laptop');

const forbiddenStyles = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  padding: ${theme.spacing[6]};
  text-align: center;
`;

const errorCodeStyles = css`
  font-family: 'Montserrat', sans-serif;
  font-size: ${theme.typography.fontSizes['5xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${greenScale[400]};
  margin-bottom: ${theme.spacing[4]};
`;

const errorMessageStyles = css`
  font-family: 'Montserrat', sans-serif;
  font-size: ${theme.typography.fontSizes['xl']};
  color: #e0e0e0;
`;

const Forbidden = () => {
  return (
    <div css={forbiddenStyles}>
      <h1 css={errorCodeStyles}>403</h1>
      <p css={errorMessageStyles}>Forbidden</p>
    </div>
  );
};

export default Forbidden;
