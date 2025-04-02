/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import useDriverAvailability from '@/hooks/driver/useDriverAvailability';
import useDriverOrders from '@/hooks/driver/useDriverOrders';
import {
  Map,
  Truck,
  User,
  Bell,
  Car,
  DollarSign,
  Power,
} from 'lucide-react';

// Styles using Emotion
const dashboardStyles = css`
  min-height: 100vh;
  background: #1a202c;
  color: #d1d5db;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
`;

const sidebarStyles = css`
  width: 80px;
  background: #111827;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1;
`;

const sidebarLinkStyles = css`
  color: #6b7280;
  transition: color 0.3s ease;
  &:hover, &.active {
    color: #fedc01;
  }
`;

const switchContainerStyles = css`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const switchStyles = css`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #6b7280;
    transition: 0.3s ease;
    border-radius: 20px;
  }
  & .slider:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: #d1d5db;
    transition: 0.3s ease;
    border-radius: 50%;
  }
  & input:checked + .slider {
    background-color: #fedc01;
  }
  & input:checked + .slider:before {
    transform: translateX(20px);
  }
`;

const switchLabelStyles = css`
  font-size: 12px;
  color: #d1d5db;
  text-align: center;
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px;
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111827;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 40;
`;

const headerLeftStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #fedc01;
`;

const headerRightStyles = css`
  display: flex;
  align-items: center;
  gap: 15px;
  & svg {
    color: #d1d5db;
  }
`;

const linkStyles = css`
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  margin-right: 15px;
  &:hover {
    text-decoration: underline;
  }
`;

const buttonStyles = css`
  padding: 6px 12px;
  background: #4a5568;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease-out;
  &:hover {
    background-color: #718096;
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
  background: #2d3748;
  color: #d1d5db;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover, &.active {
    background: #fedc01;
    color: #111827;
  }
`;

const contentStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const cardStyles = css`
  background: #2d3748;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const cardHeadingStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: #fedc01;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const cardTextStyles = css`
  font-size: 14px;
  color: #d1d5db;
`;

const submitButtonStyles = css`
  padding: 10px 20px;
  background: #fedc01;
  color: #111827;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #d4b501;
  }
  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }
`;

const DriverDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const driverId = user?.driver_profile?.id;
  const [activeTab, setActiveTab] = useState('deliveries');
  const [hasFetchedAvailability, setHasFetchedAvailability] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOnline, loading: availabilityLoading, toggleStatus, getAvailability } = useDriverAvailability(driverId);
  const { orders, loading: ordersLoading, error, assignOrder, confirmPickup, trackDelivery, completeOrder, fetchOrders } = useDriverOrders(driverId);

  // Debounced fetch function to prevent rapid calls
  const debounceFetch = useCallback(() => {
    console.log('Fetching availability for driverId:', driverId);
    getAvailability();
    setHasFetchedAvailability(true);
  }, [driverId, getAvailability]);

  useEffect(() => {
    if (driverId && !hasFetchedAvailability) {
      console.log('useEffect triggered - Initial fetch', { driverId, hasFetchedAvailability });
      debounceFetch();
    }
  }, [driverId, debounceFetch, hasFetchedAvailability]);

  // Log state changes for debugging
  useEffect(() => {
    console.log('isOnline changed:', isOnline);
  }, [isOnline]);

  if (!token || user?.role !== 'driver') {
    console.log('Redirecting: No token or not driver', { token, role: user?.role });
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAvailabilityToggle = () => {
    console.log('Toggling availability from:', isOnline, 'to:', !isOnline);
    toggleStatus(!isOnline);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'deliveries':
        return (
          <div css={contentStyles}>
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><Truck size={20} /> Order Delivery Process</h3>
              {ordersLoading ? (
                <p css={cardTextStyles}>Loading orders...</p>
              ) : error ? (
                <p css={cardTextStyles}>Error: {error.message || 'Failed to load orders'}</p>
              ) : (
                <div>
                  {orders.length === 0 ? (
                    <p css={cardTextStyles}>No orders assigned yet.</p>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} css={cardStyles} style={{ marginTop: '10px' }}>
                        <p css={cardTextStyles}>Order #{order.id} - Status: {order.status}</p>
                        <div css={actionsStyles}>
                          {order.status === 'ASSIGNED' && (
                            <button css={submitButtonStyles} onClick={() => confirmPickup(order.id)}>
                              Confirm Pickup
                            </button>
                          )}
                          {order.status === 'OUT_FOR_DELIVERY' && (
                            <>
                              <button
                                css={submitButtonStyles}
                                onClick={() => trackDelivery(order.id, { lat: 0, lng: 0 })} // Replace with real location
                              >
                                Update Location
                              </button>
                              <button css={submitButtonStyles} onClick={() => completeOrder(order.id)}>
                                Complete Delivery
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <button css={submitButtonStyles} onClick={() => fetchOrders()} style={{ marginTop: '20px' }}>
                    Refresh Orders
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'rides':
        return (
          <div css={contentStyles}>
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><Car size={20} /> Ride-Hailing Process</h3>
              <p css={cardTextStyles}>Manage your ride-hailing tasks here.</p>
            </div>
          </div>
        );
      case 'earnings':
        return (
          <div css={contentStyles}>
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><DollarSign size={20} /> Driver Payments & Earnings</h3>
              <p css={cardTextStyles}>Check your earnings, payments, and tips here.</p>
            </div>
          </div>
        );
      default:
        return <div css={cardTextStyles}>Select a section to view its content</div>;
    }
  };

  return (
    <div css={dashboardStyles}>
      <div css={sidebarStyles}>
        <Link to="#" onClick={() => setActiveTab('deliveries')} css={sidebarLinkStyles} className={activeTab === 'deliveries' ? 'active' : ''}>
          <Truck size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('rides')} css={sidebarLinkStyles} className={activeTab === 'rides' ? 'active' : ''}>
          <Car size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('earnings')} css={sidebarLinkStyles} className={activeTab === 'earnings' ? 'active' : ''}>
          <DollarSign size={24} />
        </Link>
        <div css={switchContainerStyles}>
          <label css={switchStyles}>
            <input
              type="checkbox"
              checked={isOnline}
              onChange={handleAvailabilityToggle}
              disabled={availabilityLoading}
            />
            <span className="slider"></span>
          </label>
          <span css={switchLabelStyles}>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <div css={headerLeftStyles}>Driver Dashboard</div>
          <div css={headerRightStyles}>
            <Link to="/driver/profile" css={linkStyles}>Profile</Link>
            <button onClick={handleLogout} css={buttonStyles}>Logout</button>
            <Bell size={20} />
          </div>
        </div>
        <div css={actionsStyles}>
          <div onClick={() => setActiveTab('deliveries')} css={actionBtnStyles} className={activeTab === 'deliveries' ? 'active' : ''}>
            <Truck size={16} /> Deliveries
          </div>
          <div onClick={() => setActiveTab('rides')} css={actionBtnStyles} className={activeTab === 'rides' ? 'active' : ''}>
            <Car size={16} /> Rides
          </div>
          <div onClick={() => setActiveTab('earnings')} css={actionBtnStyles} className={activeTab === 'earnings' ? 'active' : ''}>
            <DollarSign size={16} /> Earnings
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DriverDashboard;