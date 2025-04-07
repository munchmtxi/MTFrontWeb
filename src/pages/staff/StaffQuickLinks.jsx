/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStaffCustomer } from '@/hooks/staff/useStaffCustomer';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';

const pageStyles = css`
  min-height: 100vh;
  background: #1a202c;
  color: #d1d5db;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const sidebarStyles = css`
  width: 100%;
  background: #111827;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  @media (min-width: 768px) {
    width: 80px;
    padding: 20px 0;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: static;
  }
`;

const sidebarLinkStyles = css`
  color: #6b7280;
  transition: color 0.3s ease;
  &:hover, &.active {
    color: #fedc01;
  }
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px;
  padding-bottom: 70px;
  @media (min-width: 768px) {
    padding-bottom: 20px;
  }
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111827;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 40;
`;

const headerLeftStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: #fedc01;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const contentStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const cardStyles = css`
  background: #2d3748;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const cardHeadingStyles = css`
  font-size: 16px;
  font-weight: 600;
  color: #fedc01;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const cardTextStyles = css`
  font-size: 14px;
  color: #d1d5db;
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const inputStyles = css`
  padding: 8px;
  background: #4a5568;
  color: #d1d5db;
  border: none;
  border-radius: 4px;
`;

const selectStyles = css`
  padding: 8px;
  background: #4a5568;
  color: #d1d5db;
  border: none;
  border-radius: 4px;
`;

const buttonStyles = css`
  padding: 6px 12px;
  background: #fedc01;
  color: #111827;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f4c430;
  }
  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }
`;

const retryButtonStyles = css`
  padding: 6px 12px;
  background: #4a5568;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #718096;
  }
`;

const StaffQuickLinks = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const {
    bookings,
    notifications,
    orders,
    loading: customerLoading,
    error: customerError,
    checkIn,
    requestAssistance,
    processBill,
    resetError: resetCustomerError,
  } = useStaffCustomer();

  const [checkInBookingId, setCheckInBookingId] = useState('');
  const [assistanceTableId, setAssistanceTableId] = useState('');
  const [assistanceRequestType, setAssistanceRequestType] = useState('service');
  const [billOrderId, setBillOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState({ type: 'cash', provider: 'cash' });
  const [splitWith, setSplitWith] = useState('');

  if (!token || user?.role !== 'staff') {
    return <Navigate to="/" replace />;
  }

  const handleCheckIn = (e) => {
    e.preventDefault();
    if (checkInBookingId) {
      checkIn(checkInBookingId);
      setCheckInBookingId('');
    }
  };

  const handleRequestAssistance = (e) => {
    e.preventDefault();
    if (assistanceTableId && assistanceRequestType) {
      requestAssistance(assistanceTableId, assistanceRequestType);
      setAssistanceTableId('');
      setAssistanceRequestType('service');
    }
  };

  const handleProcessBill = (e) => {
    e.preventDefault();
    if (billOrderId && paymentMethod.type && paymentMethod.provider) {
      const splitArray = splitWith ? splitWith.split(',').map((id) => id.trim()) : [];
      processBill(billOrderId, paymentMethod, splitArray);
      setBillOrderId('');
      setPaymentMethod({ type: 'cash', provider: 'cash' });
      setSplitWith('');
    }
  };

  return (
    <div css={pageStyles}>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <div css={headerLeftStyles}>Staff Quick Links</div>
        </div>

        <div css={contentStyles}>
          <div css={cardStyles}>
            <h3 css={cardHeadingStyles}><LinkIcon size={18} /> Quick Links</h3>
            {customerLoading ? (
              <p css={cardTextStyles}>Loading...</p>
            ) : customerError ? (
              <p css={cardTextStyles}>
                Error: {customerError}{' '}
                <button css={retryButtonStyles} onClick={resetCustomerError}>
                  Retry
                </button>
              </p>
            ) : (
              <>
                {/* Check-In Form */}
                <form css={formStyles} onSubmit={handleCheckIn}>
                  <h4 css={cardTextStyles}>Check-In Customer</h4>
                  <input
                    css={inputStyles}
                    type="text"
                    value={checkInBookingId}
                    onChange={(e) => setCheckInBookingId(e.target.value)}
                    placeholder="Enter Booking ID"
                  />
                  <button css={buttonStyles} type="submit" disabled={customerLoading || !checkInBookingId}>
                    Check-In
                  </button>
                </form>

                {/* Assistance Request Form */}
                <form css={formStyles} onSubmit={handleRequestAssistance}>
                  <h4 css={cardTextStyles}>Request Assistance</h4>
                  <input
                    css={inputStyles}
                    type="text"
                    value={assistanceTableId}
                    onChange={(e) => setAssistanceTableId(e.target.value)}
                    placeholder="Enter Table ID"
                  />
                  <select
                    css={selectStyles}
                    value={assistanceRequestType}
                    onChange={(e) => setAssistanceRequestType(e.target.value)}
                  >
                    <option value="service">Service</option>
                    <option value="bill">Bill</option>
                    <option value="other">Other</option>
                  </select>
                  <button css={buttonStyles} type="submit" disabled={customerLoading || !assistanceTableId}>
                    Request
                  </button>
                </form>

                {/* Process Bill Form */}
                <form css={formStyles} onSubmit={handleProcessBill}>
                  <h4 css={cardTextStyles}>Process Bill</h4>
                  <input
                    css={inputStyles}
                    type="text"
                    value={billOrderId}
                    onChange={(e) => setBillOrderId(e.target.value)}
                    placeholder="Enter Order ID"
                  />
                  <select
                    css={selectStyles}
                    value={paymentMethod.type}
                    onChange={(e) =>
                      setPaymentMethod({ ...paymentMethod, type: e.target.value, provider: e.target.value === 'cash' ? 'cash' : 'card' })
                    }
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                  <input
                    css={inputStyles}
                    type="text"
                    value={splitWith}
                    onChange={(e) => setSplitWith(e.target.value)}
                    placeholder="Split with (comma-separated IDs)"
                  />
                  <button css={buttonStyles} type="submit" disabled={customerLoading || !billOrderId || !paymentMethod.type}>
                    Process
                  </button>
                </form>

                {/* Recent Activity */}
                {bookings.length > 0 && (
                  <div>
                    <h4 css={cardTextStyles}>Recent Check-Ins</h4>
                    {bookings.map((booking) => (
                      <p key={booking.id} css={cardTextStyles}>
                        Booking #{booking.reference} - Table {booking.table?.table_number} at{' '}
                        {new Date(booking.seated_at).toLocaleTimeString()}
                      </p>
                    ))}
                  </div>
                )}
                {notifications.length > 0 && (
                  <div>
                    <h4 css={cardTextStyles}>Recent Assistance Requests</h4>
                    {notifications.map((notification) => (
                      <p key={notification.id} css={cardTextStyles}>
                        {notification.message} - {new Date(notification.created_at).toLocaleTimeString()}
                      </p>
                    ))}
                  </div>
                )}
                {orders.length > 0 && (
                  <div>
                    <h4 css={cardTextStyles}>Recent Bills</h4>
                    {orders.map((order) => (
                      <p key={order.id} css={cardTextStyles}>
                        Order #{order.order_number} - {order.payment_status} at{' '}
                        {new Date(order.updated_at).toLocaleTimeString()}
                      </p>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div css={sidebarStyles}>
        <Link to="/staff/dashboard" css={sidebarLinkStyles}>
          <ArrowLeft size={22} />
        </Link>
      </div>
    </div>
  );
};

export default StaffQuickLinks;