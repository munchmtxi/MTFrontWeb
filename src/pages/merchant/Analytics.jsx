/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnalyticsSummary,
  getActiveViewers,
  getDetailedAnalytics,
} from '../../features/merchant/analyticsThunks';
import LoadingSpinner from '../../components/common/LoadingSpinner'; // Fixed to default import

const analyticsStyles = (theme) => css`
  padding: ${theme.spacing[6]};
  background-color: #1a1a1a;
  min-height: 100vh;
  color: #ffffff;
`;

const sectionStyles = (theme) => css`
  margin-bottom: ${theme.spacing[6]};
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  margin-bottom: ${theme.spacing[4]};
`;

const cardStyles = (theme) => css`
  ${theme.components.card.baseStyle};
  padding: ${theme.spacing[4]};
  background-color: ${theme.components.card.variants.filled.backgroundColor};
`;

const Analytics = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { summary, activeViewers, detailed, status, error } = useSelector((state) => state.analytics);
  const merchantId = user?.merchant?.id;

  useEffect(() => {
    if (merchantId) {
      dispatch(getAnalyticsSummary({ merchantId, period: '24h' }));
      dispatch(getActiveViewers(merchantId));
      dispatch(getDetailedAnalytics({ merchantId, filters: { limit: 10 } }));
    }
  }, [dispatch, merchantId]);

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <div css={analyticsStyles(theme)}>Error: {error}</div>;

  return (
    <div css={analyticsStyles(theme)}>
      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Analytics Summary (Last 24h)</h2>
        {summary && (
          <div css={cardStyles(theme)}>
            <p>Total Views: {summary.summary.total_views}</p>
            <p>Unique Views: {summary.summary.unique_views}</p>
            <p>Avg Duration: {summary.summary.avg_duration?.toFixed(2) || 'N/A'}s</p>
            <p>Avg Interactions: {summary.summary.avg_interactions?.toFixed(2) || 'N/A'}</p>
            <p>Authenticated Views: {summary.summary.authenticated_views}</p>
          </div>
        )}
      </section>

      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Active Viewers</h2>
        {activeViewers.length > 0 ? (
          <div css={cardStyles(theme)}>
            {activeViewers.map((viewer) => (
              <p key={viewer.id}>
                {viewer.viewer?.first_name || 'Guest'} - Last Activity: {new Date(viewer.last_activity).toLocaleTimeString()}
              </p>
            ))}
          </div>
        ) : (
          <p>No active viewers</p>
        )}
      </section>

      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Detailed Analytics</h2>
        {detailed.length > 0 ? (
          <div css={cardStyles(theme)}>
            {detailed.map((entry) => (
              <p key={entry.id}>
                {entry.view_type} - {entry.source} - {new Date(entry.created_at).toLocaleString()}
              </p>
            ))}
          </div>
        ) : (
          <p>No detailed analytics available</p>
        )}
      </section>
    </div>
  );
};

export default Analytics;