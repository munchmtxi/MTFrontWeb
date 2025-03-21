/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startPreview,
  updatePreview,
  endPreview,
  getPreview,
} from '../../features/merchant/merchantPreviewThunks';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const previewStyles = (theme) => css`
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

const inputStyles = (theme) => css`
  ${theme.components.input.baseStyle};
  width: 100%;
  margin-bottom: ${theme.spacing[4]};
`;

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  margin-right: ${theme.spacing[2]};
`;

const MerchantPreview = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { previewData, status, error } = useSelector((state) => state.merchantPreview);
  const { user } = useSelector((state) => state.auth);
  const merchantId = user?.merchant?.id;

  const [businessName, setBusinessName] = useState('');

  const handleStartPreview = () => {
    dispatch(startPreview(merchantId)).then(() => {
      dispatch(getPreview(merchantId)); // Fetch preview data after starting
    });
  };

  const handleUpdatePreview = () => {
    if (businessName) {
      dispatch(updatePreview({ merchantId, updates: { business_name: businessName } })).then(() => {
        setBusinessName('');
        dispatch(getPreview(merchantId)); // Refresh preview data after update
      });
    }
  };

  const handleEndPreview = () => {
    dispatch(endPreview(merchantId)).then(() => {
      dispatch(getPreview(merchantId)); // Refresh preview data after ending
    });
  };

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div css={previewStyles(theme)}>
      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Merchant Preview</h2>
        <div css={cardStyles(theme)}>
          <button css={buttonStyles(theme)} onClick={handleStartPreview}>
            Start Preview
          </button>
          <input
            type="text"
            placeholder="Update Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            css={inputStyles(theme)}
          />
          <button css={buttonStyles(theme)} onClick={handleUpdatePreview}>
            Update Preview
          </button>
          <button css={buttonStyles(theme)} onClick={handleEndPreview}>
            End Preview
          </button>
          <div>
            <h3>Preview Data</h3>
            {error && error === 'No active preview session found' ? (
              <p>No active preview session. Click "Start Preview" to begin.</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : previewData ? (
              <pre>{JSON.stringify(previewData, null, 2)}</pre>
            ) : (
              <p>No active preview session.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchantPreview;