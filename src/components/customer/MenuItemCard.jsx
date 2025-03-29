/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { cardStyles, cardHeadingStyles, cardTextStyles, buttonStyles } from '../common/styles';

const thumbnailStyles = css`
  width: 100px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const MenuItemCard = ({ item, onAddToCart }) => {
  const isAvailable = item.availability_status === 'in-stock' && item.quantity >= 1;

  return (
    <div css={cardStyles}>
      {item.thumbnail_url && <img src={item.thumbnail_url} alt={item.name} css={thumbnailStyles} />}
      <h3 css={cardHeadingStyles}>{item.name}</h3>
      <p css={cardTextStyles}>
        Price:{' '}
        {item.price !== item.final_price ? (
          <>
            <s>${item.price.toFixed(2)}</s> ${item.final_price.toFixed(2)}
          </>
        ) : (
          `$${item.price.toFixed(2)}`
        )}
      </p>
      <p css={cardTextStyles}>{item.description}</p>
      <p css={cardTextStyles}>Prep Time: {item.preparation_time_minutes || 'N/A'} mins</p>
      <button
        css={buttonStyles}
        onClick={() => onAddToCart(item.id)}
        disabled={!isAvailable}
      >
        {isAvailable ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default MenuItemCard;