/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Bell } from 'lucide-react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { yellowScale } from '@/styles/themeTokens';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

const bellStyles = css`
  position: relative;
  color: ${theme.components.input.baseStyle.color};
`;

const iconStyles = css`
  height: ${theme.spacing[6]};
  width: ${theme.spacing[6]};
`;

const badgeStyles = css`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${yellowScale[500]};
  color: #000;
  border-radius: ${theme.radii.full};
  height: ${theme.spacing[4]};
  width: ${theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.bold};
`;

const NotificationBell = ({ count }) => {
  return (
    <div css={bellStyles}>
      <Bell css={iconStyles} />
      {count > 0 && <span css={badgeStyles}>{count}</span>}
    </div>
  );
};

export default NotificationBell;