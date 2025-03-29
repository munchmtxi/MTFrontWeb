/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { cardStyles, cardHeadingStyles, cardTextStyles, buttonStyles } from '../../components/common/styles';
import { ShoppingCart } from 'lucide-react';

const cartPageStyles = css`
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 20px;
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
  padding: 10px;
  background: #222;
  border-radius: 8px;
`;

const CartPage = () => {
  const { cart, loading, error, fetchCart, updateItem, removeItem, clearCart } = useCart();
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  useEffect(() => {
    if (!hasFetchedCart) {
      fetchCart()
        .then(() => setHasFetchedCart(true))
        .catch((err) => {
          console.error('Failed to fetch cart:', err);
          setHasFetchedCart(true);
        });
    }
  }, [fetchCart, hasFetchedCart]);

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
    <div css={cartPageStyles}>
      <div css={cartContentStyles}>
        <h1 css={cardHeadingStyles}><ShoppingCart size={24} /> Your Cart</h1>
        {loading && <p css={cardTextStyles}>Loading cart...</p>}
        {error && <p css={cardTextStyles} style={{ color: 'red' }}>{error}</p>}
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
            <div>
              <button
                css={buttonStyles}
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span css={cardTextStyles} style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button
                css={buttonStyles}
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                css={buttonStyles}
                onClick={() => handleRemoveItem(item.id)}
                style={{ background: '#ff4444', marginLeft: '10px' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {!loading && !error && cart.items.length > 0 && (
          <div css={cardStyles}>
            <p css={cardTextStyles}>Subtotal: ${formatPrice(cart.subtotal)}</p>
            <p css={cardTextStyles}>Tax: ${formatPrice(cart.tax)}</p>
            <p css={cardTextStyles}>Delivery Fee: ${formatPrice(cart.delivery_fee)}</p>
            <p css={cardTextStyles} style={{ fontWeight: 'bold' }}>
              Total: ${formatPrice(cart.total)}
            </p>
            <button css={buttonStyles} onClick={clearCart}>Clear Cart</button>
            <Link to="/customer/checkout" css={buttonStyles} style={{ marginLeft: '10px' }}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;