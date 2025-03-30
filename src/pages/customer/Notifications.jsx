/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Bell, ShoppingCart } from 'lucide-react';
import { useCart } from '@hooks/useCart';
import axios from '../../api/axios'; // Assuming axios is configured in your project

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

const notificationListStyles = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
`;

const notificationItemStyles = css`
  background: #111;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const cardTextStyles = css`
  font-size: 14px;
  color: #ccc;
  margin: 0;
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
`;

const errorStyles = css`
  color: #ff4d4d;
  font-size: 14px;
  text-align: center;
  margin: 20px 0;
`;

const Notifications = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useCart();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/v1/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data.data || []);
      } catch (err) {
        console.error('Failed to fetch notifications:', err.response?.data || err.message);
        setError('Failed to load notifications. Please try again later.');
        // Mock data as fallback
        setNotifications([
          { id: 1, message: 'Your ride is arriving in 5 minutes!', timestamp: '2025-03-30T10:00:00Z', read: false },
          { id: 2, message: 'Table booking confirmed for 7 PM.', timestamp: '2025-03-29T15:30:00Z', read: true },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchNotifications();
    }
  }, [token]);

  if (!token || user?.role !== 'customer') return <Navigate to="/" replace />;

  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
    // Optionally, add API call to mark notification as read
    // e.g., await axios.patch(`/api/v1/notifications/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
  };

  return (
    <div css={pageStyles}>
      <div css={sidebarStyles}>
        <Link to="/customer/dashboard" css={sidebarLinkStyles}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <ArrowLeft size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link to="/customer/notifications" css={sidebarLinkStyles} className="active">
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Bell size={24} css={iconStyles} className="icon" />
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
        <div css={notificationListStyles}>
          <h1 css={css`font-size: 24px; color: #1dbf1d; margin-bottom: 20px;`}>Notifications</h1>
          {loading && <p css={cardTextStyles}>Loading notifications...</p>}
          {error && <p css={errorStyles}>{error}</p>}
          {!loading && notifications.length === 0 && (
            <p css={cardTextStyles}>No notifications available.</p>
          )}
          {!loading && notifications.length > 0 && notifications.map((notif) => (
            <div key={notif.id} css={notificationItemStyles}>
              <div>
                <p css={cardTextStyles} style={{ color: notif.read ? '#ccc' : '#e0e0e0' }}>
                  {notif.message}
                </p>
                <p css={cardTextStyles} style={{ fontSize: '12px' }}>
                  {new Date(notif.timestamp).toLocaleString()}
                </p>
              </div>
              {!notif.read && (
                <button css={buttonStyles} onClick={() => markAsRead(notif.id)}>
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;