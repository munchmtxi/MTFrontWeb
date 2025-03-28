import React, { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Users, BarChart, ClipboardList, Utensils, Package, PieChart } from 'lucide-react';
import MerchantHeader from '@/components/merchant/MerchantHeader';

const styles = `
  .staff-page {
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
  .staff-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .staff-item {
    background: #1f2937;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .staff-item p {
    font-size: 14px;
  }
  .status {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    background: #111827;
    color: #1dbf1d;
  }
`;

const Staff = () => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || user?.role !== 'merchant') return <Navigate to="/" replace />;

  const staffMembers = [
    { id: 'STF-001', name: 'Alex Rivera', role: 'Waiter', status: 'active', shifts: 'Evening' },
    { id: 'STF-002', name: 'Jasmine Park', role: 'Chef', status: 'active', shifts: 'Morning' },
  ];

  // Uncomment and replace with actual API call when endpoint is available
  // useEffect(() => {
  //   fetch('/api/merchant/staff', { headers: { Authorization: `Bearer ${token}` } })
  //     .then(res => res.json())
  //     .then(data => setStaffMembers(data))
  //     .catch(err => console.error('Error fetching staff:', err));
  // }, [token]);

  return (
    <div className="staff-page">
      <style>{styles}</style>
      <MerchantHeader />
      <div className="sidebar">
        <Link to="/merchant/dashboard" className="sidebar-link"><BarChart size={24} /></Link>
        <Link to="/merchant/orders" className="sidebar-link"><ClipboardList size={24} /></Link>
        <Link to="/merchant/reservations" className="sidebar-link"><Utensils size={24} /></Link>
        <Link to="/merchant/staff" className="sidebar-link active"><Users size={24} /></Link>
        <Link to="/merchant/inventory" className="sidebar-link"><Package size={24} /></Link>
        <Link to="/merchant/analytics" className="sidebar-link"><PieChart size={24} /></Link>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 style={{ fontSize: '20px', color: '#fedc01' }}>Staff</h1>
          <span>{user?.email}</span>
        </div>
        <div className="content">
          <h2><Users size={20} /> Staff Members</h2>
          <div className="staff-list">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="staff-item">
                <div>
                  <p>{staff.id} - {staff.name}</p>
                  <p>{staff.role} - Shift: {staff.shifts}</p>
                </div>
                <span className="status">{staff.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;