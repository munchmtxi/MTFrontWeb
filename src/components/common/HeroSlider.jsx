/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

const heroStyles = css`
  background-color: ${theme.components.card.baseStyle.backgroundColor};
  padding: ${theme.spacing[10]};
  text-align: center;
  color: #fff;
  border-bottom-left-radius: ${theme.radii['2xl']};
  border-bottom-right-radius: ${theme.radii['2xl']};
  box-shadow: ${theme.shadows.lg};
`;

const headingStyles = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['5xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${greenScale[400]};
  line-height: ${theme.typography.lineHeights.tight};
`;

const HeroSlider = () => {
  return (
    <div css={heroStyles}>
      <h1 css={headingStyles}>Welcome to Munch Mtxi</h1>
    </div>
  );
};

export default HeroSlider;