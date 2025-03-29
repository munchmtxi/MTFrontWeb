/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useOrder } from '../../hooks/useOrder';
import { useCart } from '../../hooks/useCart';
import { cardStyles, cardHeadingStyles, cardTextStyles, buttonStyles } from '../../components/common/styles';
import OrderStatus from '../../components/customer/OrderStatus';

const checkoutPageStyles = css`
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 20px;
`;

const checkoutContentStyles = css`
  max-width: 800px;
  margin: 0 auto;
`;

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useCart();
  const { currentOrder, loading, error, checkout, fetchOrderStatus } = useOrder();
  const customerId = user?.id;
  const paymentMethod = 'credit'; // Hardcoded for now; add UI to select later

  useEffect(() => {
    if (currentOrder?.order_id) {
      const interval = setInterval(() => fetchOrderStatus(currentOrder.order_id), 30000); // Poll every 30s
      return () => clearInterval(interval);
    }
  }, [currentOrder, fetchOrderStatus]);

  const handleCheckout = () => {
    if (cart.items.length > 0 && cart.id) {
      checkout(customerId, paymentMethod, cart.id);
    }
  };

  return (
    <div css={checkoutPageStyles}>
      <div css={checkoutContentStyles}>
        <h1 css={cardHeadingStyles}>Checkout</h1>
        {loading && <p css={cardTextStyles}>Processing...</p>}
        {error && <p css={cardTextStyles} style={{ color: 'red' }}>{error}</p>}
        {!currentOrder && !loading && !error && (
          <div css={cardStyles}>
            <p css={cardTextStyles}>Subtotal: ${cart.subtotal?.toFixed(2) || '0.00'}</p>
            <p css={cardTextStyles}>Tax: ${cart.tax?.toFixed(2) || '0.00'}</p>
            <p css={cardTextStyles}>Delivery Fee: ${cart.delivery_fee?.toFixed(2) || '0.00'}</p>
            <p css={cardTextStyles} style={{ fontWeight: 'bold' }}>
              Total: ${cart.total?.toFixed(2) || '0.00'}
            </p>
            <button css={buttonStyles} onClick={handleCheckout} disabled={cart.items.length === 0}>
              Place Order
            </button>
          </div>
        )}
        {currentOrder && <OrderStatus order={currentOrder} />}
      </div>
    </div>
  );
};

export default CheckoutPage;