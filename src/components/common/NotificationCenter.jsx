/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';
import notificationApi from '../../api/common/notificationApi';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

const centerStyles = css`
  background-color: ${theme.components.card.variants.filled.backgroundColor};
  padding: ${theme.spacing[4]};
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
  max-width: ${theme.grid.container.md};
  width: 100%;
`;

const headingStyles = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${greenScale[400]};
  margin-bottom: ${theme.spacing[4]};
`;

const notifItemStyles = css`
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.components.input.baseStyle.color};
  padding: ${theme.spacing[2]};
  border-bottom: 1px solid ${theme.components.modal.baseStyle.footer.borderTopColor};
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationCenter = () => {
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    notificationApi.getNotifications({ page: 1, limit: 10 }).then((res) => setNotifications(res.data));
  }, []);

  return (
    <div css={centerStyles}>
      <h3 css={headingStyles}>Notifications</h3>
      {notifications.map((notif) => (
        <div key={notif.id} css={notifItemStyles}>
          {notif.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;