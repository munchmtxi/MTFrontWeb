/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShoppingCart } from 'lucide-react';
import { useCart } from '@hooks/useCart';
import customerProfileApi from '../../api/customer/profile/customerProfileApi';

// Styles
const pageStyles = css`
  min-height: 100vh;
  background: #000;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
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

const paymentStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & input {
    padding: 10px;
    background: #333;
    border: 1px solid #444;
    border-radius: 6px;
    color: #e0e0e0;
    width: 100%;
    max-width: 400px;
    &:focus {
      border-color: #1dbf1d;
      outline: none;
    }
  }
`;

const cardTextStyles = css`
  font-size: 14px;
  color: #ccc;
  margin: 5px 0;
`;

const buttonStyles = css`
  padding: 10px 20px;
  background: #1dbf1d;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #17a317;
  }
`;

const CustomerPayment = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useCart();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({ type: 'card', last4: '', expiry: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await customerProfileApi.getProfile();
        setPaymentMethods(response.data.data.paymentMethods || []);
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!token || user?.role !== 'customer') return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setNewMethod({ ...newMethod, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await customerProfileApi.managePaymentMethods({
        action: 'add',
        paymentMethod: newMethod,
      });
      setPaymentMethods(response.data.data);
      setNewMethod({ type: 'card', last4: '', expiry: '' });
    } catch (error) {
      console.error('Failed to add payment method:', error);
    }
  };

  return (
    <div css={pageStyles}>
      <div css={sidebarStyles}>
        <Link to="/customer/dashboard" css={sidebarLinkStyles}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <ArrowLeft size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link to="/customer/profile/payment" css={sidebarLinkStyles} className="active">
          <div css={iconWrapperStyles} className="icon-wrapper">
            <CreditCard size={24} css={iconStyles} className="icon" />
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
        <div css={paymentStyles}>
          <h1 css={css`font-size: 24px; color: #1dbf1d; margin-bottom: 20px;`}>Payment Methods</h1>
          {paymentMethods.map((method) => (
            <p key={method.id} css={cardTextStyles}>
              {method.type} - {method.last4} (Expires: {method.expiry})
            </p>
          ))}
          <h2 css={css`font-size: 18px; color: #e0e0e0; margin-top: 20px;`}>Add New Payment Method</h2>
          <input
            name="last4"
            value={newMethod.last4}
            onChange={handleChange}
            placeholder="Last 4 Digits"
          />
          <input
            name="expiry"
            value={newMethod.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
          />
          <button css={buttonStyles} onClick={handleAdd}>Add Card</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayment;