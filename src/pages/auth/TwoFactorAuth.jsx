/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import TwoFAModal from '@/components/auth/TwoFAModal'; // Adjust path as needed

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

const pageStyles = css`
  min-height: 100vh;
  background-color: ${theme.components.card.baseStyle.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TwoFactorAuth = () => {
  return (
    <div css={pageStyles}>
      <TwoFAModal isOpen={true} onClose={() => window.history.back()} />
    </div>
  );
};

export default TwoFactorAuth;