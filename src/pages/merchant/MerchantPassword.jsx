/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  getPasswordHistory,
  getPasswordStrength,
} from '../../features/merchant/merchantPasswordThunks';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const passwordStyles = (theme) => css`
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

const MerchantPassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { passwordHistory, passwordStrength, status, error } = useSelector((state) => state.merchantPassword);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    dispatch(getPasswordHistory());
    dispatch(getPasswordStrength());
  }, [dispatch]);

  const handleChangePassword = () => {
    if (currentPassword && newPassword && passwordConfirmation) {
      dispatch(changePassword({ currentPassword, newPassword, passwordConfirmation })).then(() => {
        setCurrentPassword('');
        setNewPassword('');
        setPasswordConfirmation('');
        dispatch(getPasswordHistory());
        dispatch(getPasswordStrength());
      });
    }
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <div css={passwordStyles(theme)}>Error: {error}</div>;

  return (
    <div css={passwordStyles(theme)}>
      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Password Management</h2>
        <div css={cardStyles(theme)}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            css={inputStyles(theme)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            css={inputStyles(theme)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            css={inputStyles(theme)}
          />
          <button css={buttonStyles(theme)} onClick={handleChangePassword}>
            Change Password
          </button>
          <div>
            <h3>Password Strength</h3>
            <p>{passwordStrength || 'Not available'}</p>
          </div>
          <div>
            <h3>Password History</h3>
            {passwordHistory.length > 0 ? (
              <ul>
                {passwordHistory.map((entry) => (
                  <li key={entry.id}>
                    Changed on: {new Date(entry.created_at).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No password history available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchantPassword;