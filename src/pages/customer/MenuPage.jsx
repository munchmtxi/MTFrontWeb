/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useMenu } from '../../hooks/useMenu';
import MerchantCard from '../../components/customer/MerchantCard';
import MenuItemCard from '../../components/customer/MenuItemCard';
import { contentStyles, cardTextStyles, buttonStyles } from '../../components/common/styles';

const MenuPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { addItem } = useCart();
  const { merchant, branch, items, loading, error, fetchMenuItems, resetError } = useMenu();
  const [hasFetchedMenu, setHasFetchedMenu] = useState(false);

  const defaultMerchantId = 36;

  const handleFetchMenu = useCallback(async () => {
    if (!loading && !hasFetchedMenu) {
      try {
        console.log('Fetching menu items...', { merchantId: defaultMerchantId });
        await fetchMenuItems({ merchantId: defaultMerchantId });
        setHasFetchedMenu(true);
      } catch (err) {
        console.error('Menu fetch failed:', err);
        setHasFetchedMenu(true);
      }
    }
  }, [fetchMenuItems, loading, hasFetchedMenu]);

  useEffect(() => {
    if (token && !hasFetchedMenu) {
      handleFetchMenu();
    }
  }, [token, handleFetchMenu, hasFetchedMenu]);

  if (!token || user?.role !== 'customer') {
    return <Navigate to="/" replace />;
  }

  const handleAddToCart = (menuItemId) => {
    const cartItem = {
      menuItemId: Number(menuItemId), // Ensure it’s a number
      quantity: 1,
      customizations: { size: 'Large' }
    };
    console.log('Adding to cart:', cartItem); // Debug log
    addItem(cartItem)
      .then((response) => {
        console.log('Item added to cart:', response);
      })
      .catch((err) => {
        console.error('Failed to add item:', err.response?.data || err.message);
      });
  };

  return (
    <div css={css`padding: 20px; background: #000; min-height: 100vh; color: #fff;`}>
      <h1 css={css`font-size: 24px; color: #1dbf1d; margin-bottom: 20px;`}>Browse Menu</h1>
      {loading && <p css={cardTextStyles}>Loading menu items...</p>}
      {error && (
        <div>
          <p css={cardTextStyles} style={{ color: 'red' }}>{error}</p>
          <button css={buttonStyles} onClick={resetError}>Clear Error</button>
        </div>
      )}
      {!loading && !error && (
        <>
          <MerchantCard merchant={merchant} branch={branch} />
          {items.length === 0 ? (
            <p css={cardTextStyles}>No menu items available.</p>
          ) : (
            <div css={contentStyles}>
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MenuPage;