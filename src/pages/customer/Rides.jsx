/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { requestRideAsync } from '../../features/customer/rideSlice';
import { Car, Clock, History } from 'lucide-react';
import CustomerHeader from '../../components/customer/CustomerHeader';
import axios from '../../api/axios';

// Styles
const dashboardStyles = css`min-height: 100vh; background: #000; color: #fff; font-family: 'Inter', sans-serif; display: flex;`;
const sidebarStyles = css`width: 80px; background: #111; padding: 20px 0; display: flex; flex-direction: column; align-items: center; gap: 25px;`;
const iconWrapperStyles = css`display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: 2px solid #9400d3; border-radius: 50%;`;
const iconStyles = css`color: #888;`;
const sidebarLinkStyles = css`display: block; &.active .icon-wrapper { border-color: #1dbf1d; } &.active .icon { color: #1dbf1d; } &:hover .icon-wrapper { border-color: #1dbf1d; } &:hover .icon { color: #1dbf1d; }`;
const mainContentStyles = css`flex: 1; padding: 20px; padding-top: 80px;`;
const tabStyles = css`display: flex; gap: 20px; margin-bottom: 20px;`;
const tabButtonStyles = css`padding: 10px 20px; background: #222; color: #fff; border: none; border-radius: 8px; cursor: pointer; &.active { background: #1dbf1d; color: #000; }`;
const contentBoxStyles = css`background: #222; padding: 20px; border-radius: 12px;`;
const buttonStyles = css`padding: 10px; background: #1dbf1d; color: #000; border: none; border-radius: 8px; cursor: pointer; &:disabled { background: #555; cursor: not-allowed; }`;
const errorStyles = css`color: red; margin-top: 10px;`;

const Rides = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { currentRide, status, error } = useSelector((state) => state.ride);
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
          console.log('Full tracking response:', JSON.stringify(response.data, null, 2));
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
          console.log('Ride history response:', JSON.stringify(response.data, null, 2));
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

  const handleRequestRide = () => {
    dispatch(requestRideAsync({
      pickup: 'City Centre, Lilongwe, Malawi',
      dropoff: 'Kamuzu Central Hospital, Lilongwe, Malawi',
      rideType: 'STANDARD',
    }));
  };

  return (
    <div css={dashboardStyles}>
      <div css={css`position: absolute; top: 0; left: 0; width: 100%; background: linear-gradient(180deg, #000 50%, transparent 100%); padding: 5px 10px; z-index: 2;`}>
        <CustomerHeader />
      </div>
      <div css={sidebarStyles}>
        <Link to="/customer/rides" css={sidebarLinkStyles} className={activeTab === 'request' ? 'active' : ''} onClick={() => setActiveTab('request')}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Car size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link to="/customer/rides" css={sidebarLinkStyles} className={activeTab === 'track' ? 'active' : ''} onClick={() => setActiveTab('track')}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Clock size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link to="/customer/rides" css={sidebarLinkStyles} className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <History size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={tabStyles}>
          <button css={tabButtonStyles} className={activeTab === 'request' ? 'active' : ''} onClick={() => setActiveTab('request')}>
            Request Ride
          </button>
          <button css={tabButtonStyles} className={activeTab === 'track' ? 'active' : ''} onClick={() => setActiveTab('track')}>
            Track Ride
          </button>
          <button css={tabButtonStyles} className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>
            Ride History
          </button>
        </div>

        {activeTab === 'request' && (
          <div css={contentBoxStyles}>
            <h2>Request a Ride</h2>
            <button css={buttonStyles} onClick={handleRequestRide} disabled={status === 'loading'}>
              {status === 'loading' ? 'Requesting...' : 'Request Now'}
            </button>
            {currentRide && <p css={css`margin-top: 10px;`}>Ride Requested: {currentRide.status}</p>}
            {error && <p css={errorStyles}>Error: {error.message || error}</p>}
          </div>
        )}

        {activeTab === 'track' && (
          <div css={contentBoxStyles}>
            <h2>Track Your Ride</h2>
            {tracking ? (
              <div>
                <p>Driver Location: {tracking.driverLocation?.lat ?? 'N/A'}, {tracking.driverLocation?.lng ?? 'N/A'}</p>
                <p>ETA: {tracking.estimatedDuration ? `${Math.round(tracking.estimatedDuration / 60)} minutes` : 'N/A'}</p>
                {tracking.polyline && <p>Route available (polyline data present)</p>}
              </div>
            ) : currentRide ? (
              <p>Fetching tracking data...</p>
            ) : (
              <p>No active ride to track</p>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div css={contentBoxStyles}>
            <h2>Ride History</h2>
            {rideHistory.length > 0 ? (
              <ul css={css`list-style: none; padding: 0;`}>
                {rideHistory.map((ride) => (
                  <li key={ride.id} css={css`margin-bottom: 15px;`}>
                    <p>Ride ID: {ride.id}</p>
                    <p>Pickup: {ride.pickupLocation?.address || 'N/A'}</p>
                    <p>Dropoff: {ride.dropoffLocation?.address || 'N/A'}</p>
                    <p>Status: {ride.status}</p>
                    <p>Date: {new Date(ride.createdAt).toLocaleString() || 'N/A'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ride history available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rides;