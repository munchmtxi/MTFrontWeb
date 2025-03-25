import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ClipboardList,
  Utensils,
  Users,
  TrendingUp,
  Settings,
  Truck,
  ShoppingBag,
  Coffee,
  Bell,
  User,
  BarChart,
  Package,
  PieChart,
  Plus,
  FileText,
} from 'lucide-react';
import MerchantHeader from '@/components/merchant/MerchantHeader';

// Order type icon mapping
const getOrderTypeIcon = (type) => {
  switch (type) {
    case 'delivery': return <Truck size={16} style={{ color: '#fedc01' }} />;
    case 'pickup': return <ShoppingBag size={16} style={{ color: '#fedc01' }} />;
    case 'table': return <Coffee size={16} style={{ color: '#fedc01' }} />;
    default: return <ShoppingBag size={16} style={{ color: '#fedc01' }} />;
  }
};

// Status color mapping
const getStatusStyle = (status) => {
  const statusStyles = {
    pending: { backgroundColor: '#2d3748', color: '#fedc01' },
    preparing: { backgroundColor: '#2d3748', color: '#1dbf1d' },
    ready: { backgroundColor: '#2d3748', color: '#1dbf1d' },
    completed: { backgroundColor: '#2d3748', color: '#d1d5db' },
    confirmed: { backgroundColor: '#2d3748', color: '#1dbf1d' },
    seated: { backgroundColor: '#2d3748', color: '#c026d3' },
    active: { backgroundColor: '#2d3748', color: '#1dbf1d' },
    break: { backgroundColor: '#2d3748', color: '#fedc01' },
  };
  return statusStyles[status] || { backgroundColor: '#2d3748', color: '#d1d5db' };
};

// CSS styles
const styles = `
  .dashboard {
    min-height: 100vh;
    background: #1a202c;
    color: #d1d5db;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex;
  }
  .merchant-header {
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
  }
  .sidebar {
    width: 80px;
    background: #111827;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    z-index: 1;
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
    padding-top: 60px; /* Space for the MerchantHeader */
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #111827;
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .header-right svg {
    color: #d1d5db;
  }
  .header-right .user {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #d1d5db;
  }
  .header-right .user img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  .action-btn {
    padding: 10px 20px;
    background: #2d3748;
    color: #d1d5db;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .action-btn:hover, .action-btn.active {
    background: #fedc01;
    color: #111827;
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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  .card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #fedc01;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .card p {
    font-size: 14px;
    color: #d1d5db;
  }
  .sales-card {
    grid-column: span 1;
    position: relative;
  }
  .sales-card .total {
    font-size: 24px;
    font-weight: 700;
    color: #1dbf1d;
    margin: 10px 0;
  }
  .sales-card .growth {
    font-size: 14px;
    color: #c026d3;
  }
  .time-filter {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 8px;
  }
  .time-filter-btn {
    padding: 6px 12px;
    background: #1f2937;
    color: #d1d5db;
    border-radius: 16px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .time-filter-btn:hover, .time-filter-btn.active {
    background: #1dbf1d;
    color: #ffffff;
  }
  .top-items {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  .top-item {
    flex: 1 1 calc(50% - 15px);
    background: #1f2937;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }
  .top-item img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .top-item p {
    font-size: 13px;
    color: #d1d5db;
  }
  .top-item .price {
    color: #fedc01;
    font-weight: 600;
  }
  .brand-card, .size-card {
    grid-column: span 1;
  }
  .brand-item, .size-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .brand-item span, .size-item span {
    color: #d1d5db;
  }
  .brand-item .bar, .size-item .bar {
    width: 50%;
    height: 8px;
    background: #4b5563;
    border-radius: 4px;
    position: relative;
  }
  .brand-item .bar::before, .size-item .bar::before {
    content: '';
    position: absolute;
    height: 100%;
    background: #fedc01;
    border-radius: 4px;
  }
  .brand-item .bar.adidas::before { width: 60%; }
  .brand-item .bar.nike::before { width: 40%; }
  .brand-item .bar.puma::before { width: 30%; }
  .brand-item .bar.bosco::before { width: 20%; }
  .size-item .bar.size-10::before { width: 48%; }
  .size-item .bar.size-9-5::before { width: 44%; }
  .size-item .bar.size-9::before { width: 37%; }
  .size-item .bar.size-8-5::before { width: 22%; }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #1f2937;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .item-text {
    font-weight: 500;
    color: #ffffff;
  }
  .item-subtext {
    font-size: 12px;
    color: #6b7280;
  }
  .status {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    text-transform: capitalize;
  }
`;

const MerchantDashboard = () => {
  const { user, token } = useSelector((state) => state.auth || {});
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('Day');

  // Sample data
  const recentOrders = [
    { id: 'ORD-7291', customer: 'John Smith', items: 3, total: '$42.50', status: 'preparing', type: 'delivery', time: '10 mins ago' },
    { id: 'ORD-7290', customer: 'Maria Chen', items: 1, total: '$18.99', status: 'completed', type: 'delivery', time: '25 mins ago' },
  ];

  const tableBookings = [
    { id: 'TBL-421', customer: 'David Wilson', guests: 4, time: '18:30', date: 'Today', status: 'confirmed', table: 'T12' },
    { id: 'TBL-420', customer: 'Priya Sharma', guests: 2, time: '19:00', date: 'Today', status: 'seated', table: 'T8' },
  ];

  const staffMembers = [
    { id: 'STF-001', name: 'Alex Rivera', role: 'Waiter', status: 'active', shifts: 'Evening' },
    { id: 'STF-002', name: 'Jasmine Park', role: 'Chef', status: 'active', shifts: 'Morning' },
  ];

  const topItems = [
    { name: 'Silent T-Shirt Sport', price: '$65', sold: '28.0K pairs' },
    { name: 'Silent T-Shirt Sport', price: '$50', sold: '22.9K pairs' },
    { name: 'Silent T-Shirt Sport', price: '$28', sold: '22.0K pairs' },
    { name: 'Silent T-Shirt Sport', price: '$75', sold: '18.0K pairs' },
  ];

  const brands = [
    { name: 'Adidas', percentage: '60%' },
    { name: 'Nike', percentage: '40%' },
    { name: 'Puma', percentage: '30%' },
    { name: 'Bosco', percentage: '20%' },
  ];

  const sizes = [
    { size: '10', percentage: '48%' },
    { size: '9.5', percentage: '44%' },
    { size: '9', percentage: '37%' },
    { size: '8.5', percentage: '22%' },
  ];

  // Redirect if not authenticated or not a merchant
  if (!token || user?.role !== 'merchant') {
    return <Navigate to="/" replace />;
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="content">
            {/* Sales Card with Time Filter */}
            <div className="card sales-card">
              <h3><BarChart size={20} /> Sales</h3>
              <div className="time-filter">
                {['Day', 'Week', 'Month', 'Year', 'All Time'].map((period) => (
                  <div
                    key={period}
                    className={`time-filter-btn ${timeFilter === period ? 'active' : ''}`}
                    onClick={() => setTimeFilter(period)}
                  >
                    {period}
                  </div>
                ))}
              </div>
              <p>Total Sales Value</p>
              <div className="total">$268.52K</div>
              <p className="growth">+6.8% profit growth</p>
              <p style={{ marginTop: '10px' }}>Completed Sales: 379</p>
              <p className="growth" style={{ color: '#c026d3' }}>-2.1% sales decline</p>
              <p style={{ marginTop: '10px' }}>Sales in Process: 236</p>
              <p className="growth" style={{ color: '#c026d3' }}>-0.9% profit decline</p>
            </div>

            {/* Top Selling Items */}
            <div className="card">
              <h3><TrendingUp size={20} /> Top Selling Items</h3>
              <div className="top-items">
                {topItems.map((item, index) => (
                  <div key={index} className="top-item">
                    <img src="https://via.placeholder.com/100" alt={item.name} />
                    <p>{item.name}</p>
                    <p className="price">{item.price}</p>
                    <p>{item.sold}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory */}
            <div className="card">
              <h3><Package size={20} /> Inventory</h3>
              <p>Stock Value</p>
              <div className="total">$2.8M</div>
              <p className="growth">+8.0% stock growth</p>
              <p style={{ marginTop: '10px' }}>Goods in Stock: 268.5M</p>
              <p className="growth">+6.0% increase in goods</p>
            </div>

            {/* Top Selling Brands */}
            <div className="card brand-card">
              <h3><PieChart size={20} /> Top Selling Brands</h3>
              {brands.map((brand, index) => (
                <div key={index} className="brand-item">
                  <span>{brand.name}</span>
                  <div className={`bar ${brand.name.toLowerCase()}`}></div>
                  <span>{brand.percentage}</span>
                </div>
              ))}
            </div>

            {/* Top Selling Sizes */}
            <div className="card size-card">
              <h3><PieChart size={20} /> Top Selling Sizes</h3>
              {sizes.map((size, index) => (
                <div key={index} className="size-item">
                  <span>{size.size}</span>
                  <div className={`bar size-${size.size.replace('.', '-')}`}></div>
                  <span>{size.percentage}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="content">
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <h3><ClipboardList size={20} /> All Orders</h3>
              {recentOrders.map((order) => (
                <div key={order.id} className="item">
                  <div>
                    <p className="item-text">{order.id}</p>
                    <p className="item-subtext">{order.customer} - {order.items} items - {order.total}</p>
                  </div>
                  <div className="status" style={getStatusStyle(order.status)}>
                    {getOrderTypeIcon(order.type)} {order.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'tables':
        return (
          <div className="content">
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <h3><Utensils size={20} /> Table Bookings</h3>
              {tableBookings.map((booking) => (
                <div key={booking.id} className="item">
                  <div>
                    <p className="item-text">{booking.id}</p>
                    <p className="item-subtext">{booking.customer} - Table: {booking.table} - {booking.guests} guests</p>
                  </div>
                  <div className="status" style={getStatusStyle(booking.status)}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'staff':
        return (
          <div className="content">
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <h3><Users size={20} /> Staff Members</h3>
              {staffMembers.map((staff) => (
                <div key={staff.id} className="item">
                  <div>
                    <p className="item-text">{staff.name}</p>
                    <p className="item-subtext">{staff.role} - Shift: {staff.shifts}</p>
                  </div>
                  <div className="status" style={getStatusStyle(staff.status)}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="content">
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <h3><Settings size={20} /> Settings</h3>
              <p>Settings functionality coming soon...</p>
            </div>
          </div>
        );
      default:
        return <div style={{ color: '#6b7280' }}>Select a section to view its content</div>;
    }
  };

  return (
    <div className="dashboard">
      <style>{styles}</style>
      {/* Reintroduced MerchantHeader */}
      <div className="merchant-header">
        <MerchantHeader />
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <Link to="#" onClick={() => setActiveTab('overview')} className={`sidebar-link ${activeTab === 'overview' ? 'active' : ''}`}>
          <TrendingUp size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('orders')} className={`sidebar-link ${activeTab === 'orders' ? 'active' : ''}`}>
          <ClipboardList size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('tables')} className={`sidebar-link ${activeTab === 'tables' ? 'active' : ''}`}>
          <Utensils size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('staff')} className={`sidebar-link ${activeTab === 'staff' ? 'active' : ''}`}>
          <Users size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('settings')} className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}>
          <Settings size={24} />
        </Link>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fedc01' }}>Dashboard</h1>
          </div>
          <div className="header-right">
            <Bell size={20} />
            <div className="user">
              <img src="https://via.placeholder.com/32" alt="User" />
              <span>{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Repurposed) */}
        <div className="actions">
          <div onClick={() => setActiveTab('orders')} className="action-btn">
            <Plus size={16} /> Add Order
          </div>
          <div onClick={() => setActiveTab('tables')} className="action-btn">
            <Utensils size={16} /> Manage Tables
          </div>
          <div onClick={() => setActiveTab('staff')} className="action-btn">
            <Users size={16} /> Add Staff
          </div>
          <div onClick={() => setActiveTab('overview')} className="action-btn">
            <FileText size={16} /> View Reports
          </div>
          <div onClick={() => setActiveTab('settings')} className="action-btn">
            <Settings size={16} /> Settings
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default MerchantDashboard;