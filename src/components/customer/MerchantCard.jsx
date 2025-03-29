/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { cardStyles, cardHeadingStyles, cardTextStyles } from '../common/styles';

const imageStyles = css`
  width: 100px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const MerchantCard = ({ merchant, branch }) => {
  if (!merchant) return null;

  return (
    <div css={cardStyles}>
      <h3 css={cardHeadingStyles}>{merchant.business_name}</h3>
      {merchant.logo_url && <img src={merchant.logo_url} alt="Merchant Logo" css={imageStyles} />}
      <p css={cardTextStyles}>Type: {merchant.business_type}</p>
      <p css={cardTextStyles}>Currency: {merchant.currency}</p>
      {branch && (
        <>
          <p css={cardTextStyles}>Branch: {branch.name}</p>
          <p css={cardTextStyles}>Address: {branch.address}</p>
          <p css={cardTextStyles}>Phone: {branch.contact_phone}</p>
        </>
      )}
    </div>
  );
};

export default MerchantCard;