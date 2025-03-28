/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Bell,
  Calendar,
  Car,
  Mail,
  MapPin,
  Settings,
  ShoppingCart,
  User,
  Utensils,
} from 'lucide-react';
import CustomerHeader from "../../components/customer/CustomerHeader";

// Styles
const dashboardStyles = css`
  min-height: 100vh;
  background: #000;
  color: #fff;
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
  border: 2px solid #9400d3;
  border-radius: 50%;
  transition: border-color 0.3s ease;
`;

const iconStyles = css`
  color: #888;
  transition: color 0.3s ease;
`;

const sidebarLinkStyles = css`
  display: block;
  &.active .icon-wrapper {
    border-color: #1dbf1d;
  }
  &.active .icon {
    color: #1dbf1d;
  }
  &:hover .icon-wrapper {
    border-color: #1dbf1d;
  }
  &:hover .icon {
    color: #1dbf1d;
  }
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px;
  padding-top: 80px;
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
  & svg {
    color: #fff;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: #1dbf1d;
    }
  }
`;

const contentStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const cardStyles = css`
  background: #222;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.8);
  }
`;

const cardHeadingStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: #1dbf1d;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
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
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  &:hover {
    background: #17a317;
    transform: scale(1.05);
  }
`;

const CustomerDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  if (!token || user?.role !== 'customer') {
    return <Navigate to="/" replace />;
  }

  const profile = {
    id: user?.id,
    first_name: user?.first_name || 'John',
    last_name: user?.last_name || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1234567890',
    country: user?.country || 'USA',
    avatar_url: user?.avatar_url || 'https://via.placeholder.com/40x40', // Fixed URL
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div css={contentStyles}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}>
                <User size={20} /> Profile Details
              </h3>
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 20px;
                  margin-bottom: 20px;
                `}
              >
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  css={css`
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid #1dbf1d;
                  `}
                />
                <div>
                  <p css={cardTextStyles}>
                    Name: {profile.first_name} {profile.last_name}
                  </p>
                  <p css={cardTextStyles}>Email: {profile.email}</p>
                  <p css={cardTextStyles}>Phone: {profile.phone}</p>
                  <p css={cardTextStyles}>Country: {profile.country}</p>
                </div>
              </div>
              <button css={buttonStyles} onClick={() => console.log('Edit Profile')}>
                Edit Profile
              </button>
            </div>
          </div>
        );
      case 'order':
        return <div css={cardStyles}>Order Food Content</div>;
      // Removed 'taxi' case since it’s now a separate route
      case 'checkin':
        return <div css={cardStyles}>Check In Content</div>;
      case 'settings':
        return <div css={cardStyles}>Settings Content</div>;
      case 'contact':
        return <div css={cardStyles}>Contact Content</div>;
      default:
        return <div css={cardTextStyles}>Select a section to view its content</div>;
    }
  };

  return (
    <div css={dashboardStyles}>
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(180deg, #000 50%, transparent 100%);
          padding: 5px 10px;
          z-index: 2;
        `}
      >
        <CustomerHeader />
      </div>
      <div css={sidebarStyles}>
        <Link to="/customer/table-bookings" css={sidebarLinkStyles}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Calendar size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          onClick={() => setActiveTab('order')}
          css={sidebarLinkStyles}
          className={activeTab === 'order' ? 'active' : ''}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Utensils size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="/customer/rides"
          css={sidebarLinkStyles}
          className={activeTab === 'taxi' ? 'active' : ''} // Kept for visual feedback
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Car size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          onClick={() => setActiveTab('checkin')}
          css={sidebarLinkStyles}
          className={activeTab === 'checkin' ? 'active' : ''}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <MapPin size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          onClick={() => setActiveTab('settings')}
          css={sidebarLinkStyles}
          className={activeTab === 'settings' ? 'active' : ''}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Settings size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          onClick={() => setActiveTab('contact')}
          css={sidebarLinkStyles}
          className={activeTab === 'contact' ? 'active' : ''}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Mail size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <h1
            css={css`
              font-size: 18px;
              font-weight: 600;
              color: #1dbf1d;
            `}
          >
            Customer Dashboard
          </h1>
          <div css={headerRightStyles}>
            <Bell size={20} onClick={() => console.log('Notifications clicked')} />
            <ShoppingCart size={20} onClick={() => console.log('Shopping Cart clicked')} />
            <User size={20} onClick={() => setActiveTab('profile')} />
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerDashboard;