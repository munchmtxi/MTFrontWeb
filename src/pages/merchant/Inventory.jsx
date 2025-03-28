/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, ClipboardList, Utensils, Users, Package, PieChart } from 'lucide-react';
import { fetchInventoryStatsThunk } from '../../features/merchant/inventoryThunks';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const styles = `
  .inventory-page {
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
  .select {
    padding: 8px;
    background: #1f2937;
    border-radius: 8px;
    color: #d1d5db;
    border: none;
    margin-bottom: 20px;
    width: 200px;
    font-size: 14px;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  .stat-card {
    background: #1f2937;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }
  .stat-label {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 5px;
  }
  .stat-value {
    font-size: 20px;
    color: #1dbf1d;
  }
`;

const branches = [
  { id: null, name: 'All Branches' },
  { id: 1, name: 'Branch 1' },
  { id: 2, name: 'Branch 2' },
];

const Inventory = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { stats, branchId, loading, error } = useSelector((state) => state.inventory);
  const [selectedBranch, setSelectedBranch] = useState(branchId || null);

  useEffect(() => {
    if (token && user?.role === 'merchant') {
      dispatch(fetchInventoryStatsThunk(selectedBranch));
    }
  }, [dispatch, token, user, selectedBranch]);

  const handleBranchChange = (e) => {
    const branchId = e.target.value === 'all' ? null : parseInt(e.target.value, 10);
    setSelectedBranch(branchId);
  };

  if (!token || user?.role !== 'merchant') return <Navigate to="/" replace />;

  return (
    <div className="inventory-page">
      <style>{styles}</style>
      <MerchantHeader />
      <div className="sidebar">
        <Link to="/merchant/dashboard" className="sidebar-link"><BarChart size={24} /></Link>
        <Link to="/merchant/orders" className="sidebar-link"><ClipboardList size={24} /></Link>
        <Link to="/merchant/reservations" className="sidebar-link"><Utensils size={24} /></Link>
        <Link to="/merchant/staff" className="sidebar-link"><Users size={24} /></Link>
        <Link to="/merchant/inventory" className="sidebar-link active"><Package size={24} /></Link>
        <Link to="/merchant/analytics" className="sidebar-link"><PieChart size={24} /></Link>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 style={{ fontSize: '20px', color: '#fedc01' }}>Inventory</h1>
          <span>{user?.email}</span>
        </div>
        <div className="content">
          <h2><Package size={20} /> Inventory Overview</h2>
          <select className="select" value={selectedBranch || 'all'} onChange={handleBranchChange}>
            {branches.map((branch) => (
              <option key={branch.id || 'all'} value={branch.id || 'all'}>
                {branch.name}
              </option>
            ))}
          </select>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p style={{ color: '#dc3545' }}>Error: {error}</p>
          ) : (
            <div className="stats">
              <div className="stat-card">
                <div className="stat-label">Total Products</div>
                <div className="stat-value">{stats.total_products}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Tracked Products</div>
                <div className="stat-value">{stats.tracked_products}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Out of Stock</div>
                <div className="stat-value">{stats.out_of_stock_products}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Low Stock</div>
                <div className="stat-value">{stats.low_stock_products}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Inventory Value</div>
                <div className="stat-value">${(Math.round(stats.inventory_value * 100) / 100).toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;