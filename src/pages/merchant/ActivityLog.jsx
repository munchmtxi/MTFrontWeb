/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities, validateActivityChain, logActivity } from '@/features/merchant/activityLogThunks';
import MerchantHeader from '@/components/merchant/MerchantHeader';

// ----- Styles -----
const activityLogPageStyles = (theme) => css`
  padding: ${theme.spacing[4]};
  max-width: ${theme.breakpoints['2xl']};
  margin: 0 auto;
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  color: ${theme.greenScale[700]};
  margin-bottom: ${theme.spacing[4]};
`;

const activityListStyles = (theme) => css`
  display: grid;
  gap: ${theme.spacing[2]};
`;

const activityItemStyles = (theme) => css`
  border: 1px solid ${theme.grayScale[300]};
  padding: ${theme.spacing[2]};
  border-radius: ${theme.radii.md};
`;

const formStyles = (theme) => css`
  margin-bottom: ${theme.spacing[4]};
  display: grid;
  gap: ${theme.spacing[2]};
`;

const inputStyles = (theme) => css`
  padding: ${theme.spacing[2]};
  border: 1px solid ${theme.grayScale[300]};
  border-radius: ${theme.radii.sm};
  font-size: ${theme.typography.fontSizes.md};
  width: 100%;
  box-sizing: border-box;
`;

const labelStyles = (theme) => css`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.grayScale[700]};
  margin-bottom: ${theme.spacing[1]};
`;

const buttonStyles = (theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${theme.greenScale[500]};
  color: #ffffff;
  border: none;
  border-radius: ${theme.radii.md};
  cursor: pointer;
  &:hover {
    background-color: ${theme.greenScale[400]};
  }
  &:disabled {
    background-color: ${theme.grayScale[400]};
    cursor: not-allowed;
  }
`;

const infoStyles = (theme) => css`
  margin-bottom: ${theme.spacing[1]};
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.grayScale[800]};
`;

const errorStyles = (theme) => css`
  color: ${theme.grayScale[400]};
  font-size: ${theme.typography.fontSizes.md};
  margin-bottom: ${theme.spacing[3]};
`;

const ActivityLog = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || {});
  const { activities, loading, error, validationResult } = useSelector((state) => state.activityLog || { activities: [], loading: false, error: null, validationResult: null });

  const [newActivity, setNewActivity] = useState({
    eventType: '',
    changes: '',
    metadata: '',
  });

  useEffect(() => {
    if (user?.merchantId) {
      dispatch(fetchActivities({ merchantId: user.merchantId }));
    }
  }, [dispatch, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    if (!user?.merchantId) return;

    const activityData = {
      eventType: newActivity.eventType || 'TEST_EVENT',
      changes: newActivity.changes ? JSON.parse(newActivity.changes) : null,
      metadata: newActivity.metadata ? JSON.parse(newActivity.metadata) : null,
    };

    await dispatch(logActivity({ merchantId: user.merchantId, activityData }));
    setNewActivity({ eventType: '', changes: '', metadata: '' });
    dispatch(fetchActivities({ merchantId: user.merchantId }));
  };

  const handleValidateChain = () => {
    if (user?.merchantId) {
      dispatch(validateActivityChain(user.merchantId));
    }
  };

  return (
    <>
      <MerchantHeader />
      <div css={activityLogPageStyles(theme)}>
        <h1 css={headingStyles(theme)}>Activity Log</h1>
        {loading && <p css={infoStyles(theme)}>Loading...</p>}
        {error && <p css={errorStyles(theme)}>Error: {error}</p>}
        {validationResult && <p css={infoStyles(theme)}>Validation: {validationResult}</p>}

        <form onSubmit={handleLogActivity} css={formStyles(theme)}>
          <div>
            <label css={labelStyles(theme)}>Event Type</label>
            <input
              type="text"
              name="eventType"
              value={newActivity.eventType}
              onChange={handleInputChange}
              placeholder="e.g., PROFILE_UPDATE"
              required
              css={inputStyles(theme)}
            />
          </div>
          <div>
            <label css={labelStyles(theme)}>Changes (JSON)</label>
            <input
              type="text"
              name="changes"
              value={newActivity.changes}
              onChange={handleInputChange}
              placeholder='e.g., {"field": "value"}'
              css={inputStyles(theme)}
            />
          </div>
          <div>
            <label css={labelStyles(theme)}>Metadata (JSON)</label>
            <input
              type="text"
              name="metadata"
              value={newActivity.metadata}
              onChange={handleInputChange}
              placeholder='e.g., {"source": "web"}'
              css={inputStyles(theme)}
            />
          </div>
          <button type="submit" css={buttonStyles(theme)} disabled={loading}>
            Log Activity
          </button>
        </form>

        <button
          onClick={handleValidateChain}
          css={buttonStyles(theme)}
          disabled={loading}
        >
          Validate Activity Chain
        </button>

        <div css={activityListStyles(theme)}>
          {Array.isArray(activities) && activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} css={activityItemStyles(theme)}>
                <p css={infoStyles(theme)}><strong>Event:</strong> {activity.event_type || 'N/A'}</p>
                <p css={infoStyles(theme)}><strong>Actor ID:</strong> {activity.actor_id || 'N/A'}</p>
                <p css={infoStyles(theme)}><strong>Date:</strong> {activity.created_at ? new Date(activity.created_at).toLocaleString() : 'N/A'}</p>
                {activity.changes && <p css={infoStyles(theme)}><strong>Changes:</strong> {JSON.stringify(activity.changes)}</p>}
                {activity.metadata && <p css={infoStyles(theme)}><strong>Metadata:</strong> {JSON.stringify(activity.metadata)}</p>}
                <p css={infoStyles(theme)}><strong>Security Hash:</strong> {activity.security_hash || 'N/A'}</p>
                <p css={infoStyles(theme)}><strong>Previous Hash:</strong> {activity.previous_hash || 'None'}</p>
              </div>
            ))
          ) : (
            <p css={infoStyles(theme)}>No activities available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityLog;