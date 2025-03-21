/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setup2FA,
  enable2FA,
  verify2FA,
  disable2FA,
  updatePreferredMethod,
  generateNewBackupCodes,
} from '../../features/merchant/merchant2FAThunks';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const twoFAStyles = (theme) => css`
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

const selectStyles = (theme) => css`
  ${theme.components.input.baseStyle};
  width: 100%;
  margin-bottom: ${theme.spacing[4]};
`;

const Merchant2FA = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { setupData, backupCodes, isEnabled, preferredMethod, status, error } = useSelector((state) => state.merchant2FA);
  const [token, setToken] = useState('');
  const [method, setMethod] = useState('authenticator');

  const handleSetup2FA = () => {
    dispatch(setup2FA(method));
  };

  const handleEnable2FA = () => {
    if (token) dispatch(enable2FA({ token, method }));
  };

  const handleVerify2FA = () => {
    if (token) dispatch(verify2FA({ token, method }));
  };

  const handleDisable2FA = () => {
    if (token) dispatch(disable2FA(token));
  };

  const handleUpdateMethod = () => {
    if (token) dispatch(updatePreferredMethod({ newMethod: method, token }));
  };

  const handleGenerateBackupCodes = () => {
    if (token) dispatch(generateNewBackupCodes(token));
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <div css={twoFAStyles(theme)}>Error: {error}</div>;

  return (
    <div css={twoFAStyles(theme)}>
      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Two-Factor Authentication</h2>
        <div css={cardStyles(theme)}>
          <select css={selectStyles(theme)} value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="authenticator">Authenticator App</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </select>
          <input
            type="text"
            placeholder="Enter 2FA Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            css={inputStyles(theme)}
          />
          {!isEnabled && (
            <>
              <button css={buttonStyles(theme)} onClick={handleSetup2FA}>
                Setup 2FA
              </button>
              {setupData && setupData.qrCode && (
                <div>
                  <p>Scan this QR code with your authenticator app:</p>
                  <img src={setupData.qrCode} alt="2FA QR Code" />
                  <p>Or enter this secret manually: {setupData.secret}</p>
                  <button css={buttonStyles(theme)} onClick={handleEnable2FA}>
                    Enable 2FA
                  </button>
                </div>
              )}
            </>
          )}
          {isEnabled && (
            <>
              <button css={buttonStyles(theme)} onClick={handleVerify2FA}>
                Verify 2FA
              </button>
              <button css={buttonStyles(theme)} onClick={handleDisable2FA}>
                Disable 2FA
              </button>
              <button css={buttonStyles(theme)} onClick={handleUpdateMethod}>
                Update Method
              </button>
              <button css={buttonStyles(theme)} onClick={handleGenerateBackupCodes}>
                Generate New Backup Codes
              </button>
              {backupCodes.length > 0 && (
                <div>
                  <h3>Backup Codes</h3>
                  <ul>
                    {backupCodes.map((code, index) => (
                      <li key={index}>{code}</li>
                    ))}
                  </ul>
                  <p>Store these codes securely. They can be used to access your account if you lose your 2FA device.</p>
                </div>
              )}
            </>
          )}
          <p>Current Method: {preferredMethod}</p>
          <p>2FA Enabled: {isEnabled ? 'Yes' : 'No'}</p>
        </div>
      </section>
    </div>
  );
};

export default Merchant2FA;