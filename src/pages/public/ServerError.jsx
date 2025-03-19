/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

const serverErrorStyles = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.components.card.baseStyle.backgroundColor};
  padding: ${theme.spacing[6]};
  text-align: center;
`;

const errorCodeStyles = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['5xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${greenScale[400]};
  margin-bottom: ${theme.spacing[4]};
`;

const errorMessageStyles = css`
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.typography.fontSizes['xl']};
  color: #fff;
`;

const ServerError = () => {
  return (
    <div css={serverErrorStyles}>
      <h1 css={errorCodeStyles}>500</h1>
      <p css={errorMessageStyles}>Server Error</p>
    </div>
  );
};

export default ServerError;