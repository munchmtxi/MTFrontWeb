/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrUpdateDraft,
  getDraft,
  submitDraft,
} from '../../features/merchant/draftThunks';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const draftsStyles = (theme) => css`
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

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  margin-top: ${theme.spacing[4]};
`;

const Drafts = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { draft, status, error } = useSelector((state) => state.draft);
  const merchantId = user?.merchant?.id;

  const [draftData, setDraftData] = useState({
    business_name: '',
    address: '',
  });

  useEffect(() => {
    if (merchantId) {
      dispatch(getDraft());
    }
  }, [dispatch, merchantId]);

  useEffect(() => {
    if (draft) {
      setDraftData(draft.draft_data);
    }
  }, [draft]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDraftData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    dispatch(createOrUpdateDraft(draftData));
  };

  const handleSubmitDraft = () => {
    dispatch(submitDraft());
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <div css={draftsStyles(theme)}>Error: {error}</div>;

  return (
    <div css={draftsStyles(theme)}>
      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Manage Drafts</h2>
        <div css={cardStyles(theme)}>
          <label>
            Business Name:
            <input
              type="text"
              name="business_name"
              value={draftData.business_name}
              onChange={handleInputChange}
              css={theme.components.input.baseStyle}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={draftData.address}
              onChange={handleInputChange}
              css={theme.components.input.baseStyle}
            />
          </label>
          <button css={buttonStyles(theme)} onClick={handleSaveDraft}>
            Save Draft
          </button>
          {draft && draft.status === 'draft' && (
            <button css={buttonStyles(theme)} onClick={handleSubmitDraft}>
              Submit for Review
            </button>
          )}
        </div>
        {draft && (
          <div css={cardStyles(theme)}>
            <p>Status: {draft.status}</p>
            <p>Expires At: {new Date(draft.expires_at).toLocaleString()}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Drafts;