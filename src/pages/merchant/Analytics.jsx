/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, ClipboardList, Utensils, Users, Package, PieChart } from 'lucide-react';
import {
  getAnalyticsSummary,
  getActiveViewers,
  getDetailedAnalytics,
} from '../../features/merchant/analyticsThunks';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const styles = `
  .analytics-page {
    min-height: 100vh;
    background: #1a202c;
    color: #d1d5db;
    font-family: 'Inter', sans-serif;
    display: flex;
  }
  .sidebar {
    width: 80px;
    background: #111827;
    padding: 80px 0 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .sidebar-link {
    color: #6b7280;
    transition: color 0.3s ease;
  }
  .sidebar-link:hover, .sidebar-link.active {
    color: #fedc01;
  }
  .main-content {
    flex: 1;
    padding: 20px;
    padding-top: 80px;
  }
  .header {
    background: #111827;
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    background: #2d3748;
    border-radius: 10px;
    padding: 20px;
  }
  .content h2 {
    font-size: 18px;
    color: #fedc01;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section {
    margin-bottom: 20px;
  }
  .card p {
    font-size: 14px;
    margin: 5px 0;
  }
`;

const Analytics = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { summary, activeViewers, detailed, status, error } = useSelector((state) => state.analytics);
  const merchantId = user?.merchant?.id;

  useEffect(() => {
    if (merchantId) {
      dispatch(getAnalyticsSummary({ merchantId, period: '24h' }));
      dispatch(getActiveViewers(merchantId));
      dispatch(getDetailedAnalytics({ merchantId, filters: { limit: 10 } }));
    }
  }, [dispatch, merchantId]);

  if (!token || user?.role !== 'merchant') return <Navigate to="/" replace />;
  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <div className="analytics-page"><style>{styles}</style><p>Error: {error}</p></div>;

  return (
    <div className="analytics-page">
      <style>{styles}</style>
      <MerchantHeader />
      <div className="sidebar">
        <Link to="/merchant/dashboard" className="sidebar-link"><BarChart size={24} /></Link>
        <Link to="/merchant/orders" className="sidebar-link"><ClipboardList size={24} /></Link>
        <Link to="/merchant/reservations" className="sidebar-link"><Utensils size={24} /></Link>
        <Link to="/merchant/staff" className="sidebar-link"><Users size={24} /></Link>
        <Link to="/merchant/inventory" className="sidebar-link"><Package size={24} /></Link>
        <Link to="/merchant/analytics" className="sidebar-link active"><PieChart size={24} /></Link>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 style={{ fontSize: '20px', color: '#fedc01' }}>Analytics</h1>
          <span>{user?.email}</span>
        </div>
        <div className="content">
          <div className="section">
            <h2><PieChart size={20} /> Summary (Last 24h)</h2>
            {summary && (
              <div className="card">
                <p>Total Views: {summary.summary.total_views}</p>
                <p>Unique Views: {summary.summary.unique_views}</p>
                <p>Avg Duration: {summary.summary.avg_duration?.toFixed(2) || 'N/A'}s</p>
                <p>Avg Interactions: {summary.summary.avg_interactions?.toFixed(2) || 'N/A'}</p>
                <p>Authenticated Views: {summary.summary.authenticated_views}</p>
              </div>
            )}
          </div>
          <div className="section">
            <h2><Users size={20} /> Active Viewers</h2>
            {activeViewers.length > 0 ? (
              <div className="card">
                {activeViewers.map((viewer) => (
                  <p key={viewer.id}>
                    {viewer.viewer?.first_name || 'Guest'} - Last Activity: {new Date(viewer.last_activity).toLocaleTimeString()}
                  </p>
                ))}
              </div>
            ) : (
              <p>No active viewers</p>
            )}
          </div>
          <div className="section">
            <h2><BarChart size={20} /> Detailed Analytics</h2>
            {detailed.length > 0 ? (
              <div className="card">
                {detailed.map((entry) => (
                  <p key={entry.id}>
                    {entry.view_type} - {entry.source} - {new Date(entry.created_at).toLocaleString()}
                  </p>
                ))}
              </div>
            ) : (
              <p>No detailed analytics available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;