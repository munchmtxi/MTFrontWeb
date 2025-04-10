/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { useStaffAvailability } from '@/hooks/staff/useStaffAvailability';
import { usePerformanceIncentive } from '@/hooks/staff/usePerformanceIncentive';
import { useStaffDriverCoordination } from '@/hooks/staff/useStaffDriverCoordination';
import { Calendar, CheckSquare, User, Bell, Award, Truck, Table2, Link as LinkIcon } from 'lucide-react';

// Existing styles (unchanged unless noted)
const dashboardStyles = css`
  min-height: 100vh;
  background: #1a202c;
  color: #d1d5db;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const sidebarStyles = css`
  width: 100%;
  background: #111827;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  @media (min-width: 768px) {
    width: 80px;
    padding: 20px 0;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: static;
  }
`;

const sidebarLinkStyles = css`
  color: #6b7280;
  transition: color 0.3s ease;
  cursor: pointer; /* Ensure clickable */
  &:hover, &.active {
    color: #fedc01;
  }
`;

const switchContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
`;

const switchStyles = css`
  position: relative;
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
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px;
  padding-bottom: 70px;
  z-index: 0;
  @media (min-width: 768px) {
    padding-bottom: 20px;
  }
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111827;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 40;
`;

const headerLeftStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: #fedc01;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const headerRightStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  & svg {
    color: #d1d5db;
  }
`;

const linkStyles = css`
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
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
  &:hover {
    background-color: #718096;
  }
`;

const actionsStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const actionBtnStyles = css`
  padding: 8px 16px;
  background: #2d3748;
  color: #d1d5db;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
  z-index: 1;
  &:hover, &.active {
    background: #fedc01;
    color: #111827;
  }
`;

const contentStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const cardStyles = css`
  background: #2d3748;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const cardHeadingStyles = css`
  font-size: 16px;
  font-weight: 600;
  color: #fedc01;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const cardTextStyles = css`
  font-size: 14px;
  color: #d1d5db;
`;

const redeemFormStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const selectStyles = css`
  padding: 8px;
  background: #4a5568;
  color: #d1d5db;
  border: none;
  border-radius: 4px;
`;

const inputStyles = css`
  padding: 8px;
  background: #4a5568;
  color: #d1d5db;
  border: none;
  border-radius: 4px;
`;

const taskTabsStyles = css`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const taskTabStyles = css`
  padding: 10px 20px;
  cursor: pointer;
  background: #4a5568;
  color: #d1d5db;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  &.active {
    background: #fedc01;
    color: #111827;
  }
`;

const taskActionBtnStyles = css`
  padding: 6px 12px;
  background: #fedc01;
  color: #111827;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
  margin-right: 5px;
  &:hover {
    background: #f4c430;
  }
  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }
`;

const StaffDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { status, loading: availabilityLoading, setAvailability } = useStaffAvailability();
  const {
    metrics,
    points,
    tier,
    redemptionHistory,
    loading: perfLoading,
    error: perfError,
    getMetrics,
    calculate,
    assign,
    redeem,
  } = usePerformanceIncentive();
  const {
    orders: driverOrders,
    tracking,
    loading: coordLoading,
    error: coordError,
    assignDriver,
    confirmPickup,
    trackDelivery,
    completeOrder,
    getDriverOrderOverview,
    resetError: resetCoordError,
  } = useStaffDriverCoordination();

  const [activeTab, setActiveTab] = useState('tasks');
  const [taskSubTab, setTaskSubTab] = useState('orders');
  const [rewardType, setRewardType] = useState('gift_card');
  const [pointsToRedeem, setPointsToRedeem] = useState('');
  const [hasFetchedMetrics, setHasFetchedMetrics] = useState(false);
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);

  const staffId = user?.id;
  const branchId = '1'; // Replace with dynamic branchId from user or context

  useEffect(() => {
    if (staffId && !hasFetchedMetrics) {
      getMetrics(staffId);
      setHasFetchedMetrics(true);
    }
    if (branchId && !hasFetchedOrders) {
      getDriverOrderOverview(branchId);
      setHasFetchedOrders(true);
    }
  }, [staffId, branchId, getMetrics, getDriverOrderOverview]);

  const profile = {
    name: user?.email || 'Unknown',
    role: 'Staff',
    joined: 'Jan 2023',
    shifts: '40 this month',
  };

  if (!token || user?.role !== 'staff') {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAvailabilityToggle = () => {
    const newStatus = status === 'available' ? 'offline' : 'available';
    setAvailability(newStatus);
  };

  const handleCalculateRewards = () => {
    if (staffId) calculate(staffId);
  };

  const handleAssignTier = () => {
    if (staffId) assign(staffId);
  };

  const handleRedeemRewards = (e) => {
    e.preventDefault();
    if (staffId && pointsToRedeem > 0) {
      redeem(staffId, rewardType, Number(pointsToRedeem));
      setPointsToRedeem('');
    }
  };

  const renderTasksContent = () => {
    return (
      <div css={contentStyles}>
        <div css={taskTabsStyles}>
          <div
            css={taskTabStyles}
            className={taskSubTab === 'orders' ? 'active' : ''}
            onClick={() => setTaskSubTab('orders')}
          >
            <Truck size={14} /> Orders
          </div>
          <div
            css={taskTabStyles}
            className={taskSubTab === 'tableBooking' ? 'active' : ''}
            onClick={() => setTaskSubTab('tableBooking')}
          >
            <Table2 size={14} /> Table Booking
          </div>
        </div>

        {taskSubTab === 'orders' && (
          <div css={cardStyles}>
            <h3 css={cardHeadingStyles}><Truck size={18} /> Order Tasks</h3>
            {coordLoading ? (
              <p css={cardTextStyles}>Loading...</p>
            ) : coordError ? (
              <p css={cardTextStyles}>
                Error: {coordError}{' '}
                <button css={buttonStyles} onClick={resetCoordError}>
                  Retry
                </button>
              </p>
            ) : driverOrders.length > 0 ? (
              driverOrders.map((order) => (
                <div key={order.orderId} css={cardTextStyles}>
                  <p>Order #{order.orderNumber} - Status: {order.status}</p>
                  {order.status === 'preparing' && !order.driver && (
                    <button
                      css={taskActionBtnStyles}
                      onClick={() => assignDriver(order.orderId, null)}
                      disabled={coordLoading}
                    >
                      Assign Driver
                    </button>
                  )}
                  {order.status === 'preparing' && order.driver && (
                    <button
                      css={taskActionBtnStyles}
                      onClick={() => confirmPickup(order.orderId, 'driver-token-placeholder')}
                      disabled={coordLoading}
                    >
                      Confirm Pickup
                    </button>
                  )}
                  {order.status === 'out_for_delivery' && (
                    <>
                      <button
                        css={taskActionBtnStyles}
                        onClick={() => trackDelivery(order.orderId)}
                        disabled={coordLoading}
                      >
                        Track Delivery
                      </button>
                      <button
                        css={taskActionBtnStyles}
                        onClick={() => completeOrder(order.orderId)}
                        disabled={coordLoading}
                      >
                        Complete Order
                      </button>
                    </>
                  )}
                  {tracking && tracking.orderId === order.orderId && (
                    <p css={cardTextStyles}>
                      Tracking: {tracking.currentLocation} - ETA:{' '}
                      {new Date(tracking.estimatedDeliveryTime).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p css={cardTextStyles}>No orders available</p>
            )}
          </div>
        )}

        {taskSubTab === 'tableBooking' && (
          <div css={cardStyles}>
            <h3 css={cardHeadingStyles}><Table2 size={18} /> Table Booking Tasks</h3>
            <p css={cardTextStyles}>Table booking tasks coming soon...</p>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return renderTasksContent();
      case 'schedule':
        return (
          <div css={contentStyles}>
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><Calendar size={18} /> Schedule</h3>
              <p css={cardTextStyles}>{availabilityLoading ? 'Loading...' : 'Schedule coming soon...'}</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div css={contentStyles}>
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><User size={18} /> Profile Details</h3>
              <p css={cardTextStyles}>Name: {profile.name}</p>
              <p css={cardTextStyles}>Role: {profile.role}</p>
              <p css={cardTextStyles}>Joined: {profile.joined}</p>
              <p css={cardTextStyles}>Shifts: {profile.shifts}</p>
              <Link to="/staff/profile" css={linkStyles}>
                Edit Profile
              </Link>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div css={contentStyles}>
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><Award size={18} /> Performance Metrics</h3>
              {perfLoading ? (
                <p css={cardTextStyles}>Loading...</p>
              ) : perfError ? (
                <p css={cardTextStyles}>Error: {perfError}</p>
              ) : metrics ? (
                <>
                  <p css={cardTextStyles}>Completed Orders: {metrics.completedOrders}</p>
                  <p css={cardTextStyles}>Closed In-Dining Orders: {metrics.closedInDiningOrders}</p>
                  <p css={cardTextStyles}>Table Turnovers: {metrics.tableTurnovers}</p>
                  <p css={cardTextStyles}>Quick Check-Ins: {metrics.quickCheckIns}</p>
                  <p css={cardTextStyles}>Positive Feedback: {metrics.positiveFeedback}</p>
                  <p css={cardTextStyles}>Tips Received: {metrics.tipsReceived} MWK</p>
                  <p css={cardTextStyles}>Bookings Handled: {metrics.bookingsHandled}</p>
                  <p css={cardTextStyles}>Staff Requests Fulfilled: {metrics.staffRequestsFulfilled}</p>
                </>
              ) : (
                <p css={cardTextStyles}>No metrics available</p>
              )}
            </div>
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><Award size={18} /> Rewards</h3>
              <p css={cardTextStyles}>Points: {points}</p>
              <p css={cardTextStyles}>Tier: {tier}</p>
              <button css={buttonStyles} onClick={handleCalculateRewards} disabled={perfLoading}>
                {perfLoading ? 'Calculating...' : 'Calculate Rewards'}
              </button>
              <button
                css={buttonStyles}
                onClick={handleAssignTier}
                disabled={perfLoading}
                style={{ marginLeft: '10px' }}
              >
                {perfLoading ? 'Assigning...' : 'Assign Tier'}
              </button>
            </div>
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><Award size={18} /> Redeem Rewards</h3>
              <form css={redeemFormStyles} onSubmit={handleRedeemRewards}>
                <select
                  css={selectStyles}
                  value={rewardType}
                  onChange={(e) => setRewardType(e.target.value)}
                >
                  <option value="gift_card">Gift Card</option>
                  <option value="time_off">Time Off</option>
                  <option value="cash">Cash</option>
                </select>
                <input
                  css={inputStyles}
                  type="number"
                  value={pointsToRedeem}
                  onChange={(e) => setPointsToRedeem(e.target.value)}
                  placeholder="Points to redeem"
                  min="1"
                  max={points}
                />
                <button css={buttonStyles} type="submit" disabled={perfLoading || pointsToRedeem <= 0}>
                  {perfLoading ? 'Redeeming...' : 'Redeem'}
                </button>
              </form>
              {redemptionHistory.length > 0 && (
                <>
                  <h4 css={cardHeadingStyles}>Redemption History</h4>
                  {redemptionHistory.map((item, index) => (
                    <p key={index} css={cardTextStyles}>
                      {item.rewardType} - {item.pointsRedeemed} points for {item.value} (
                      {new Date(item.date).toLocaleDateString()})
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        );
      default:
        return <div css={cardTextStyles}>Select a section</div>;
    }
  };

  return (
    <div css={dashboardStyles}>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <div css={headerLeftStyles}>Staff Dashboard</div>
          <div css={headerRightStyles}>
            <Link to="/staff/profile" css={linkStyles}>
              Profile
            </Link>
            <Link to="/staff/notifications" css={linkStyles}>
              Notifications
            </Link>
            <button onClick={handleLogout} css={buttonStyles}>
              Logout
            </button>
            <Bell size={18} />
          </div>
        </div>

        <div css={actionsStyles}>
          <div
            onClick={() => setActiveTab('tasks')}
            css={actionBtnStyles}
            className={activeTab === 'tasks' ? 'active' : ''}
          >
            <CheckSquare size={14} /> Tasks
          </div>
          <div
            onClick={() => setActiveTab('schedule')}
            css={actionBtnStyles}
            className={activeTab === 'schedule' ? 'active' : ''}
          >
            <Calendar size={14} /> Schedule
          </div>
          <div
            onClick={() => setActiveTab('profile')}
            css={actionBtnStyles}
            className={activeTab === 'profile' ? 'active' : ''}
          >
            <User size={14} /> Profile
          </div>
          <div
            onClick={() => setActiveTab('performance')}
            css={actionBtnStyles}
            className={activeTab === 'performance' ? 'active' : ''}
          >
            <Award size={14} /> Performance
          </div>
          <Link to="/staff/notifications" css={actionBtnStyles}>
            <Bell size={14} /> Notifications
          </Link>
          <Link to="/staff/quick-links" css={actionBtnStyles}>
            <LinkIcon size={14} /> Quick Links
          </Link>
        </div>

        {renderContent()}
      </div>

      <div css={sidebarStyles}>
        <Link
          to="#"
          onClick={() => setActiveTab('tasks')}
          css={sidebarLinkStyles}
          className={activeTab === 'tasks' ? 'active' : ''}
        >
          <CheckSquare size={22} />
        </Link>
        <Link
          to="#"
          onClick={() => setActiveTab('schedule')}
          css={sidebarLinkStyles}
          className={activeTab === 'schedule' ? 'active' : ''}
        >
          <Calendar size={22} />
        </Link>
        <Link
          to="#"
          onClick={() => setActiveTab('profile')}
          css={sidebarLinkStyles}
          className={activeTab === 'profile' ? 'active' : ''}
        >
          <User size={22} />
        </Link>
        <Link
          to="#"
          onClick={() => setActiveTab('performance')}
          css={sidebarLinkStyles}
          className={activeTab === 'performance' ? 'active' : ''}
        >
          <Award size={22} />
        </Link>
        <Link to="/staff/notifications" css={sidebarLinkStyles}>
          <Bell size={22} />
        </Link>
        <Link to="/staff/quick-links" css={sidebarLinkStyles}>
          <LinkIcon size={22} />
        </Link>
        <div css={switchContainerStyles}>
          <label css={switchStyles}>
            <input type="checkbox" checked={status === 'available'} onChange={handleAvailabilityToggle} />
            <span className="slider"></span>
          </label>
          <span css={switchLabelStyles}>{status === 'available' ? 'Available' : 'Offline'}</span>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;