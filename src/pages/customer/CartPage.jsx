/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

// Styles
const pageStyles = css`
  min-height: 100vh;
  background: #000;
  color: #e0e0e0;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const sidebarStyles = css`
  width: 80px;
  background: #111;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
  }
`;

const iconWrapperStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
`;

const iconStyles = css`
  color: #e0e0e0;
  transition: color 0.3s ease;
`;

const sidebarLinkStyles = css`
  display: block;
  &.active .icon-wrapper {
    background-color: #1dbf1d;
  }
  &.active .icon {
    color: #000;
  }
  &:hover .icon-wrapper {
    background-color: #1dbf1d;
  }
  &:hover .icon {
    color: #000;
  }
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px 30px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const headerRightStyles = css`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  & svg {
    color: #e0e0e0;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: #1dbf1d;
    }
  }
`;

const badgeStyles = css`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #1dbf1d;
  color: #000;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const cartContentStyles = css`
  max-width: 800px;
  margin: 0 auto;
`;

const cartItemStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  background: #111;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const cardTextStyles = css`
  font-size: 14px;
  color: #ccc;
  margin: 5px 0;
`;

const buttonStyles = css`
  padding: 8px 16px;
  background: #1dbf1d;
  color: #000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #17a317;
  }
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const totalCardStyles = css`
  background: #111;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const CartPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { cart, loading, error, fetchCart, updateItem, removeItem, clearCart } = useCart();
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  useEffect(() => {
    if (!hasFetchedCart && token) {
      fetchCart()
        .then(() => setHasFetchedCart(true))
        .catch((err) => {
          console.error('Failed to fetch cart:', err);
          setHasFetchedCart(true);
        });
    }
  }, [fetchCart, hasFetchedCart, token]);

  if (!token || user?.role !== 'customer') return <Navigate to="/" replace />;

  const handleUpdateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity > 0) {
      updateItem(cartItemId, newQuantity);
    }
  };

  const handleRemoveItem = (cartItemId) => {
    removeItem(cartItemId, false);
  };

  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    return numPrice.toFixed(2);
  };

  return (
    <div css={pageStyles}>
      <div css={sidebarStyles}>
        <Link to="/customer/dashboard" css={sidebarLinkStyles}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <ArrowLeft size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link to="/customer/cart" css={sidebarLinkStyles} className="active">
          <div css={iconWrapperStyles} className="icon-wrapper">
            <ShoppingCart size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <h1 css={css`font-size: 18px; font-weight: 600; color: #1dbf1d;`}>Good Day, {user?.email}!</h1>
          <div css={headerRightStyles}>
            <Link to="/customer/cart" css={css`position: relative;`}>
              <ShoppingCart size={20} />
              {cart.items.length > 0 && <span css={badgeStyles}>{cart.items.length}</span>}
            </Link>
          </div>
        </div>
        <div css={cartContentStyles}>
          <h1 css={css`font-size: 24px; color: #1dbf1d; margin-bottom: 20px;`}>Your Cart</h1>
          {loading && <p css={cardTextStyles}>Loading cart...</p>}
          {error && <p css={cardTextStyles} style={{ color: '#ff4d4d' }}>{error}</p>}
          {!loading && !error && cart.items.length === 0 && (
            <p css={cardTextStyles}>Your cart is empty.</p>
          )}
          {!loading && !error && cart.items.length > 0 && cart.items.map((item) => (
            <div key={item.id} css={cartItemStyles}>
              <div>
                <p css={cardTextStyles}>{item.name || 'Unnamed Item'}</p>
                <p css={cardTextStyles}>
                  ${formatPrice(item.unit_price)} x {item.quantity} = $
                  {formatPrice(item.unit_price * item.quantity)}
                </p>
                {item.customizations?.size && (
                  <p css={cardTextStyles}>Size: {item.customizations.size}</p>
                )}
              </div>
              <div css={css`display: flex; align-items: center; gap: 10px;`}>
                <button
                  css={buttonStyles}
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span css={cardTextStyles}>{item.quantity}</span>
                <button
                  css={buttonStyles}
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  css={buttonStyles}
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ background: '#ff4444' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {!loading && !error && cart.items.length > 0 && (
            <div css={totalCardStyles}>
              <p css={cardTextStyles}>Subtotal: ${formatPrice(cart.subtotal)}</p>
              <p css={cardTextStyles}>Tax: ${formatPrice(cart.tax)}</p>
              <p css={cardTextStyles}>Delivery Fee: ${formatPrice(cart.delivery_fee)}</p>
              <p css={cardTextStyles} style={{ fontWeight: 'bold', color: '#e0e0e0' }}>
                Total: ${formatPrice(cart.total)}
              </p>
              <div css={css`display: flex; gap: 10px; margin-top: 15px;`}>
                <button css={buttonStyles} onClick={clearCart}>Clear Cart</button>
                <Link to="/customer/checkout" css={buttonStyles}>Proceed to Checkout</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;