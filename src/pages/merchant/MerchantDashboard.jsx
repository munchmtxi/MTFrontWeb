import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BarChart, ClipboardList, Utensils, Users, Package, PieChart } from 'lucide-react';
import MerchantHeader from '@/components/merchant/MerchantHeader';
import useBranches from '../../hooks/useBranches'; // Add this import

const styles = `
  .dashboard {
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  .card {
    background: #2d3748;
    border-radius: 10px;
    padding: 20px;
  }
  .card h3 {
    font-size: 18px;
    color: #fedc01;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .card p {
    font-size: 14px;
  }
  .sales-card .total {
    font-size: 24px;
    color: #1dbf1d;
    margin: 10px 0;
  }
  .time-filter {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
  .time-filter-btn {
    padding: 6px 12px;
    background: #1f2937;
    border-radius: 16px;
    font-size: 12px;
    cursor: pointer;
  }
  .time-filter-btn.active {
    background: #1dbf1d;
    color: #ffffff;
  }
  .link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #fedc01;
    color: #111827;
    border-radius: 20px;
    text-decoration: none;
    margin-top: 10px;
  }
`;

const MerchantDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { branches, getBranches, loading } = useBranches(); // Use the hook
  const [timeFilter, setTimeFilter] = useState('Day');

  useEffect(() => {
    if (branches.length === 0 && !loading) getBranches(); // Fetch branches if not loaded
  }, [branches, loading, getBranches]);

  if (!token || user?.role !== 'merchant') return <Navigate to="/" replace />;

  const branchId = branches.length > 0 ? branches[0].id : '1'; // Match MerchantHeader logic

  return (
    <div className="dashboard">
      <style>{styles}</style>
      <MerchantHeader />
      <div className="sidebar">
        <Link to="/merchant/dashboard" className="sidebar-link active"><BarChart size={24} /></Link>
        <Link to="/merchant/orders" className="sidebar-link"><ClipboardList size={24} /></Link>
        <Link to={`/merchant/reservations/${branchId}`} className="sidebar-link"><Utensils size={24} /></Link>
        <Link to="/merchant/staff" className="sidebar-link"><Users size={24} /></Link>
        <Link to="/merchant/inventory" className="sidebar-link"><Package size={24} /></Link>
        <Link to="/merchant/analytics" className="sidebar-link"><PieChart size={24} /></Link>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 style={{ fontSize: '20px', color: '#fedc01' }}>Dashboard</h1>
          <span>{user?.email}</span>
        </div>
        <div className="content">
          <div className="card sales-card">
            <h3><BarChart size={20} /> Sales Overview</h3>
            <div className="time-filter">
              {['Day', 'Week', 'Month'].map((period) => (
                <div
                  key={period}
                  className={`time-filter-btn ${timeFilter === period ? 'active' : ''}`}
                  onClick={() => setTimeFilter(period)}
                >
                  {period}
                </div>
              ))}
            </div>
            <p>Total Sales</p>
            <div className="total">$268.52K</div>
            <Link to="/merchant/analytics" className="link-btn">View Analytics</Link>
          </div>
          <div className="card">
            <h3><Package size={20} /> Inventory</h3>
            <p>Stock Value: $2.8M</p>
            <p>Low Stock Items: 5</p>
            <Link to="/merchant/inventory" className="link-btn">Manage Inventory</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;