/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowLeft,
  Link as LinkIcon,
  QrCode,
  Bell,
  CreditCard,
  ShoppingCart,
} from 'lucide-react';
import useQuickLink from '@hooks/useQuickLink';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { cardStyles, cardHeadingStyles, cardTextStyles, buttonStyles } from '@/components/common/styles';

// Reusing styles from InDiningPage
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
  @media (max-width: -sound768px) {
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

const formStyles = css`
  display: grid;
  gap: 15px;
  & label {
    color: #ccc;
    font-size: 14px;
    margin-bottom: 5px;
  }
  & input, & select {
    padding: 10px;
    background: #333;
    border: 1px solid #444;
    border-radius: 6px;
    color: #e0e0e0;
    width: 100%;
    &:focus {
      border-color: #1dbf1d;
      outline: none;
    }
  }
`;

const resultStyles = css`
  margin-top: 15px;
  padding: 10px;
  background: #222;
  border-radius: 6px;
`;

const errorStyles = css`
  color: #ff4d4d;
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
`;

const QuickLinksPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart); // Assuming cart slice exists
  const {
    checkIn,
    callStaff,
    requestBill,
    checkInData,
    callStaffData,
    billData,
    loading,
    error,
    clearError,
  } = useQuickLink();

  const [checkInForm, setCheckInForm] = useState({ bookingId: '' });
  const [callStaffForm, setCallStaffForm] = useState({ tableId: '', requestType: 'assistance' });
  const [billForm, setBillForm] = useState({
    inDiningOrderId: '',
    paymentMethodType: 'MOBILE_MONEY',
    paymentMethodProvider: '',
    splitWith: '',
  });

  if (!token || user?.role !== 'customer') return <Navigate to="/" replace />;

  const profile = { email: user?.email || 'john.doe@example.com' };

  const handleCheckIn = (e) => {
    e.preventDefault();
    checkIn(user.id, checkInForm.bookingId);
  };

  const handleCallStaff = (e) => {
    e.preventDefault();
    callStaff(user.id, callStaffForm.tableId, callStaffForm.requestType);
  };

  const handleRequestBill = (e) => {
    e.preventDefault();
    const paymentMethod = {
      type: billForm.paymentMethodType,
      provider: billForm.paymentMethodProvider,
    };
    const splitWith = billForm.splitWith ? billForm.splitWith.split(',').map(id => id.trim()) : [];
    requestBill(user.id, billForm.inDiningOrderId, paymentMethod, splitWith);
  };

  return (
    <div css={pageStyles}>
      <div css={sidebarStyles}>
        <Link to="/customer/dashboard" css={sidebarLinkStyles}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <ArrowLeft size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link to="/customer/quick-links" css={sidebarLinkStyles} className="active">
          <div css={iconWrapperStyles} className="icon-wrapper">
            <LinkIcon size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <h1 css={css`font-size: 18px; font-weight: 600; color: #1dbf1d;`}>Quick Links, {profile.email}!</h1>
          <div css={headerRightStyles}>
            <Link to="/customer/cart" css={css`position: relative;`}>
              <ShoppingCart size={20} />
              {cart?.items?.length > 0 && <span css={badgeStyles}>{cart.items.length}</span>}
            </Link>
          </div>
        </div>
        <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
          {/* Check In */}
          <div css={cardStyles}>
            <h3 css={cardHeadingStyles}><QrCode size={20} /> Check In</h3>
            <form css={formStyles} onSubmit={handleCheckIn}>
              <label>
                Booking ID:
                <input
                  type="text"
                  value={checkInForm.bookingId}
                  onChange={(e) => setCheckInForm({ ...checkInForm, bookingId: e.target.value })}
                  placeholder="Enter Booking ID"
                  required
                />
              </label>
              <button type="submit" css={buttonStyles} disabled={loading}>
                Check In
              </button>
            </form>
            {checkInData && (
              <div css={resultStyles}>
                <p css={cardTextStyles}>Table: {checkInData.booking.table_number}</p>
                <p css={cardTextStyles}>Status: {checkInData.booking.status}</p>
                <p css={cardTextStyles}>Wait Time: {checkInData.waitTimeEstimate} mins</p>
              </div>
            )}
          </div>

          {/* Call Staff */}
          <div css={cardStyles}>
            <h3 css={cardHeadingStyles}><Bell size={20} /> Call Staff</h3>
            <form css={formStyles} onSubmit={handleCallStaff}>
              <label>
                Table ID:
                <input
                  type="text"
                  value={callStaffForm.tableId}
                  onChange={(e) => setCallStaffForm({ ...callStaffForm, tableId: e.target.value })}
                  placeholder="Enter Table ID"
                  required
                />
              </label>
              <label>
                Request Type:
                <select
                  value={callStaffForm.requestType}
                  onChange={(e) => setCallStaffForm({ ...callStaffForm, requestType: e.target.value })}
                >
                  <option value="assistance">Assistance</option>
                  <option value="order">Order</option>
                  <option value="emergency">Emergency</option>
                </select>
              </label>
              <button type="submit" css={buttonStyles} disabled={loading}>
                Call Staff
              </button>
            </form>
            {callStaffData && (
              <div css={resultStyles}>
                <p css={cardTextStyles}>Message: {callStaffData.notification.message}</p>
                <p css={cardTextStyles}>Priority: {callStaffData.notification.priority}</p>
              </div>
            )}
          </div>

          {/* Request Bill */}
          <div css={cardStyles}>
            <h3 css={cardHeadingStyles}><CreditCard size={20} /> Request Bill</h3>
            <form css={formStyles} onSubmit={handleRequestBill}>
              <label>
                Order ID:
                <input
                  type="text"
                  value={billForm.inDiningOrderId}
                  onChange={(e) => setBillForm({ ...billForm, inDiningOrderId: e.target.value })}
                  placeholder="Enter Order ID"
                  required
                />
              </label>
              <label>
                Payment Method:
                <select
                  value={billForm.paymentMethodType}
                  onChange={(e) => setBillForm({ ...billForm, paymentMethodType: e.target.value })}
                >
                  <option value="MOBILE_MONEY">Mobile Money</option>
                  <option value="BANK_CARD">Bank Card</option>
                </select>
              </label>
              <label>
                Provider:
                <input
                  type="text"
                  value={billForm.paymentMethodProvider}
                  onChange={(e) => setBillForm({ ...billForm, paymentMethodProvider: e.target.value })}
                  placeholder="e.g., MTN, Visa"
                  required
                />
              </label>
              <label>
                Split With (comma-separated IDs):
                <input
                  type="text"
                  value={billForm.splitWith}
                  onChange={(e) => setBillForm({ ...billForm, splitWith: e.target.value })}
                  placeholder="e.g., 1, 2, 3"
                />
              </label>
              <button type="submit" css={buttonStyles} disabled={loading}>
                Request Bill
              </button>
            </form>
            {billData && (
              <div css={resultStyles}>
                {Array.isArray(billData.payment) ? (
                  billData.payment.map((p, idx) => (
                    <div key={idx}>
                      <p css={cardTextStyles}>Payment ID: {p.id}</p>
                      <p css={cardTextStyles}>Amount: ${p.amount}</p>
                      <p css={cardTextStyles}>Status: {p.status}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <p css={cardTextStyles}>Payment ID: {billData.payment.id}</p>
                    <p css={cardTextStyles}>Amount: ${billData.payment.amount}</p>
                    <p css={cardTextStyles}>Status: {billData.payment.status}</p>
                  </>
                )}
              </div>
            )}
          </div>

          {loading && <LoadingSpinner />}
          {error && (
            <div css={errorStyles}>
              {error} <button css={buttonStyles} onClick={clearError}>Clear Error</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickLinksPage;