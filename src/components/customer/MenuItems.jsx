/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useCart } from '../../hooks/useCart';
import { cardStyles, cardHeadingStyles, cardTextStyles, buttonStyles } from '../common/styles'; // Assuming shared styles

const menuItemsStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const MenuItems = () => {
  const { menuItems, loading, error, fetchMenuItems, addItem } = useCart();

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleAddToCart = (menuItemId) => {
    addItem(menuItemId, 1, { size: 'Large' }); // Example customization
  };

  return (
    <div css={menuItemsStyles}>
      {loading && <p css={cardTextStyles}>Loading menu items...</p>}
      {error && <p css={cardTextStyles} style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && menuItems.length === 0 && (
        <p css={cardTextStyles}>No menu items available.</p>
      )}
      {!loading && !error && menuItems.map((item) => (
        <div key={item.id} css={cardStyles}>
          <h3 css={cardHeadingStyles}>{item.name}</h3>
          <p css={cardTextStyles}>Price: ${item.price.toFixed(2)}</p>
          <p css={cardTextStyles}>{item.description}</p>
          <button
            css={buttonStyles}
            onClick={() => handleAddToCart(item.id)}
            disabled={item.availability_status !== 'in-stock' || item.quantity < 1}
          >
            {item.availability_status === 'in-stock' && item.quantity >= 1
              ? 'Add to Cart'
              : 'Out of Stock'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;