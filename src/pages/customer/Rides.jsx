/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { requestRideAsync } from '../../features/customer/rideSlice';
import { ArrowLeft, Car, Clock, History, ShoppingCart } from 'lucide-react';
import { useCart } from '@hooks/useCart';
import axios from '../../api/axios';

// Styles (aligned with TableBookings and MenuPage)
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

const cardStyles = css`
  background: #111;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const cardHeadingStyles = css`
  font-size: 18px;
  font-weight: 600;
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
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const errorStyles = css`
  color: #ff4d4d;
  margin-top: 10px;
`;

const Rides = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { currentRide, status, error } = useSelector((state) => state.ride);
  const { cart } = useCart();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('request');
  const [tracking, setTracking] = useState(null);
  const [rideHistory, setRideHistory] = useState([]);

  useEffect(() => {
    if (activeTab === 'track' && currentRide) {
      const fetchTracking = async () => {
        try {
          const response = await axios.get(`/api/v1/rides/${currentRide.id}/track`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTracking(response.data.tracking || null);
        } catch (err) {
          console.error('Tracking failed:', err.response?.data || err.message);
          setTracking(null);
        }
      };
      fetchTracking();
    }
  }, [activeTab, currentRide, token]);

  useEffect(() => {
    if (activeTab === 'history' && token) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get('/api/v1/rides/history', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRideHistory(response.data.data?.rides || []);
        } catch (err) {
          console.error('History fetch failed:', err.response?.data || err.message);
          setRideHistory([]);
        }
      };
      fetchHistory();
    }
  }, [activeTab, token]);

  if (!token || user?.role !== 'customer') return <Navigate to="/" replace />;

  const profile = {
    email: user?.email || 'john.doe@example.com',
  };

  const handleRequestRide = () => {
    dispatch(requestRideAsync({
      pickup: 'City Centre, Lilongwe, Malawi',
      dropoff: 'Kamuzu Central Hospital, Lilongwe, Malawi',
      rideType: 'STANDARD',
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'request':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><Car size={20} /> Request a Ride</h3>
              <button css={buttonStyles} onClick={handleRequestRide} disabled={status === 'loading'}>
                {status === 'loading' ? 'Requesting...' : 'Request Now'}
              </button>
              {currentRide && <p css={cardTextStyles}>Ride Requested: {currentRide.status}</p>}
              {error && <p css={errorStyles}>Error: {error.message || error}</p>}
            </div>
          </div>
        );
      case 'track':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><Clock size={20} /> Track Your Ride</h3>
              {tracking ? (
                <div>
                  <p css={cardTextStyles}>Driver Location: {tracking.driverLocation?.lat ?? 'N/A'}, {tracking.driverLocation?.lng ?? 'N/A'}</p>
                  <p css={cardTextStyles}>ETA: {tracking.estimatedDuration ? `${Math.round(tracking.estimatedDuration / 60)} minutes` : 'N/A'}</p>
                  {tracking.polyline && <p css={cardTextStyles}>Route available (polyline data present)</p>}
                </div>
              ) : currentRide ? (
                <p css={cardTextStyles}>Fetching tracking data...</p>
              ) : (
                <p css={cardTextStyles}>No active ride to track</p>
              )}
            </div>
          </div>
        );
      case 'history':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><History size={20} /> Ride History</h3>
              {rideHistory.length > 0 ? (
                <ul css={css`list-style: none; padding: 0;`}>
                  {rideHistory.map((ride) => (
                    <li key={ride.id} css={css`margin-bottom: 15px;`}>
                      <p css={cardTextStyles}>Ride ID: {ride.id}</p>
                      <p css={cardTextStyles}>Pickup: {ride.pickupLocation?.address || 'N/A'}</p>
                      <p css={cardTextStyles}>Dropoff: {ride.dropoffLocation?.address || 'N/A'}</p>
                      <p css={cardTextStyles}>Status: {ride.status}</p>
                      <p css={cardTextStyles}>Date: {new Date(ride.createdAt).toLocaleString() || 'N/A'}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p css={cardTextStyles}>No ride history available</p>
              )}
            </div>
          </div>
        );
      default:
        return <div css={cardTextStyles}>Select a tab to view its content</div>;
    }
  };

  return (
    <div css={pageStyles}>
      <div css={sidebarStyles}>
        {/* Back to Dashboard */}
        <Link to="/customer/dashboard" css={sidebarLinkStyles}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <ArrowLeft size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        {/* Request Ride */}
        <Link
          to="/customer/rides"
          css={sidebarLinkStyles}
          className={activeTab === 'request' ? 'active' : ''}
          onClick={() => setActiveTab('request')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Car size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        {/* Track Ride */}
        <Link
          to="/customer/rides"
          css={sidebarLinkStyles}
          className={activeTab === 'track' ? 'active' : ''}
          onClick={() => setActiveTab('track')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Clock size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        {/* Ride History */}
        <Link
          to="/customer/rides"
          css={sidebarLinkStyles}
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <History size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <h1 css={css`font-size: 18px; font-weight: 600; color: #1dbf1d;`}>Good Day, {profile.email}!</h1>
          <div css={headerRightStyles}>
            <Link to="/customer/cart" css={css`position: relative;`}>
              <ShoppingCart size={20} />
              {cart.items.length > 0 && <span css={badgeStyles}>{cart.items.length}</span>}
            </Link>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Rides;