/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ShoppingBag,
  CreditCard,
  User,
  Bell,
  Calendar, // Added for TableBookings link
} from 'lucide-react';
import CustomerHeader from '../../components/customer/CustomerHeader';

// Styles using Emotion (unchanged)
const dashboardStyles = css`
  min-height: 100vh;
  background: #1a202c; /* Dark blue-grey background */
  color: #d1d5db; /* Light grey text */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
`;

const customerHeaderStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg, #111827 50%, transparent 100%);
  padding: 10px 20px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const sidebarStyles = css`
  width: 80px;
  background: #111827; /* Black sidebar */
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1;
`;

const sidebarLinkStyles = css`
  color: #6b7280; /* Grey */
  transition: color 0.3s ease;
  &:hover, &.active {
    color: #fedc01; /* Yellow on hover/active */
  }
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px;
  padding-top: 60px; /* Space for the CustomerHeader */
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111827; /* Black header */
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const headerLeftStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const headerRightStyles = css`
  display: flex;
  align-items: center;
  gap: 15px;
  & svg {
    color: #d1d5db;
  }
`;

const userStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #d1d5db;
  & img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

const actionsStyles = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const actionBtnStyles = css`
  padding: 10px 20px;
  background: #2d3748; /* Dark grey */
  color: #d1d5db;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover, &.active {
    background: #fedc01; /* Yellow */
    color: #111827;
  }
`;

const contentStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const cardStyles = css`
  background: #2d3748; /* Dark grey cards */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const cardHeadingStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: #fedc01; /* Yellow */
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const cardTextStyles = css`
  font-size: 14px;
  color: #d1d5db;
`;

const orderItemStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #1f2937; /* Slightly darker grey */
  border-radius: 6px;
  margin-bottom: 10px;
`;

const paymentItemStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #1f2937;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const profileCardStyles = css`
  grid-column: span 1;
`;

const itemTextStyles = css`
  font-weight: 500;
  color: #ffffff;
`;

const itemSubtextStyles = css`
  font-size: 12px;
  color: #6b7280; /* Grey */
`;

const statusStyles = (status) => css`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: #2d3748;
  color: ${status === 'delivered' ? '#d1d5db' : status === 'shipped' ? '#1dbf1d' : '#fedc01'};
`;

// CustomerDashboard Component
const CustomerDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for customer
  const recentOrders = [
    { id: 'ORD-7291', items: 3, total: '$42.50', status: 'Shipped', date: 'Mar 22, 2025' },
    { id: 'ORD-7290', items: 1, total: '$18.99', status: 'Delivered', date: 'Mar 20, 2025' },
  ];

  const paymentMethods = [
    { id: 'PM-001', type: 'Visa', lastFour: '1234', expiry: '12/26' },
    { id: 'PM-002', type: 'MasterCard', lastFour: '5678', expiry: '09/25' },
  ];

  const profile = {
    name: user?.email,
    role: 'Customer',
    joined: 'Feb 2023',
    orders: '15 this year',
  };

  // Redirect if not authenticated or not a customer
  if (!token || user?.role !== 'customer') {
    return <Navigate to="/" replace />;
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div css={contentStyles}>
            {/* Recent Orders Card */}
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><ShoppingBag size={20} /> Recent Orders</h3>
              {recentOrders.map((order) => (
                <div key={order.id} css={orderItemStyles}>
                  <div>
                    <p css={itemTextStyles}>{order.id}</p>
                    <p css={itemSubtextStyles}>{order.items} items - {order.total} - {order.date}</p>
                  </div>
                  <div css={statusStyles(order.status.toLowerCase())}>{order.status}</div>
                </div>
              ))}
            </div>

            {/* Payment Methods Card */}
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><CreditCard size={20} /> Payment Methods</h3>
              {paymentMethods.map((payment) => (
                <div key={payment.id} css={paymentItemStyles}>
                  <div>
                    <p css={itemTextStyles}>{payment.type} ending in {payment.lastFour}</p>
                    <p css={itemSubtextStyles}>Expires: {payment.expiry}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Card */}
            <div css={[cardStyles, profileCardStyles]}>
              <h3 css={cardHeadingStyles}><User size={20} /> Profile</h3>
              <p css={cardTextStyles}>Name: {profile.name}</p>
              <p css={cardTextStyles}>Role: {profile.role}</p>
              <p css={cardTextStyles}>Joined: {profile.joined}</p>
              <p css={cardTextStyles}>Orders: {profile.orders}</p>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div css={contentStyles}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><ShoppingBag size={20} /> All Orders</h3>
              {recentOrders.map((order) => (
                <div key={order.id} css={orderItemStyles}>
                  <div>
                    <p css={itemTextStyles}>{order.id}</p>
                    <p css={itemSubtextStyles}>{order.items} items - {order.total} - {order.date}</p>
                  </div>
                  <div css={statusStyles(order.status.toLowerCase())}>{order.status}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'payments':
        return (
          <div css={contentStyles}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><CreditCard size={20} /> All Payment Methods</h3>
              {paymentMethods.map((payment) => (
                <div key={payment.id} css={paymentItemStyles}>
                  <div>
                    <p css={itemTextStyles}>{payment.type} ending in {payment.lastFour}</p>
                    <p css={itemSubtextStyles}>Expires: {payment.expiry}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div css={contentStyles}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><User size={20} /> Profile Details</h3>
              <p css={cardTextStyles}>Name: {profile.name}</p>
              <p css={cardTextStyles}>Role: {profile.role}</p>
              <p css={cardTextStyles}>Joined: {profile.joined}</p>
              <p css={cardTextStyles}>Orders: {profile.orders}</p>
            </div>
          </div>
        );
      default:
        return <div css={cardTextStyles}>Select a section to view its content</div>;
    }
  };

  return (
    <div css={dashboardStyles}>
      {/* CustomerHeader */}
      <div css={customerHeaderStyles}>
        <CustomerHeader />
      </div>

      {/* Sidebar */}
      <div css={sidebarStyles}>
        <Link to="#" onClick={() => setActiveTab('overview')} css={sidebarLinkStyles} className={activeTab === 'overview' ? 'active' : ''}>
          <ShoppingBag size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('orders')} css={sidebarLinkStyles} className={activeTab === 'orders' ? 'active' : ''}>
          <ShoppingBag size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('payments')} css={sidebarLinkStyles} className={activeTab === 'payments' ? 'active' : ''}>
          <CreditCard size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('profile')} css={sidebarLinkStyles} className={activeTab === 'profile' ? 'active' : ''}>
          <User size={24} />
        </Link>
        {/* New Link to TableBookings */}
        <Link to="/customer/table-bookings" css={sidebarLinkStyles}>
          <Calendar size={24} />
        </Link>
      </div>

      {/* Main Content */}
      <div css={mainContentStyles}>
        {/* Header */}
        <div css={headerStyles}>
          <div css={headerLeftStyles}>
            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fedc01' }}>Customer Dashboard</h1>
          </div>
          <div css={headerRightStyles}>
            <Bell size={20} />
            <div css={userStyles}>
              <img src="https://via.placeholder.com/32" alt="User" />
              <span>{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div css={actionsStyles}>
          <div onClick={() => setActiveTab('orders')} css={actionBtnStyles}>
            <ShoppingBag size={16} /> View Orders
          </div>
          <div onClick={() => setActiveTab('payments')} css={actionBtnStyles}>
            <CreditCard size={16} /> Manage Payments
          </div>
          <div onClick={() => setActiveTab('profile')} css={actionBtnStyles}>
            <User size={16} /> View Profile
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerDashboard;