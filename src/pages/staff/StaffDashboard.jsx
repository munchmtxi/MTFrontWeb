/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Calendar,
  CheckSquare,
  User,
  Bell,
} from 'lucide-react';
import StaffHeader from '@/components/staff/StaffHeader';

// Styles using Emotion
const dashboardStyles = css`
  min-height: 100vh;
  background: #1a202c; /* Dark blue-grey background */
  color: #d1d5db; /* Light grey text */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
`;

const staffHeaderStyles = css`
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
`;

const sidebarStyles = css`
  width: 80px;
  background: #111827; /* Black sidebar */
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1;
`;

const sidebarLinkStyles = css`
  color: #6b7280; /* Grey */
  transition: color 0.3s ease;
  &:hover, &.active {
    color: #fedc01; /* Yellow on hover/active */
  }
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px;
  padding-top: 60px; /* Space for the StaffHeader */
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111827; /* Black header */
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const headerLeftStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const headerRightStyles = css`
  display: flex;
  align-items: center;
  gap: 15px;
  & svg {
    color: #d1d5db;
  }
`;

const userStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #d1d5db;
  & img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
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
  background: #2d3748; /* Dark grey */
  color: #d1d5db;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover, &.active {
    background: #fedc01; /* Yellow */
    color: #111827;
  }
`;

const contentStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const cardStyles = css`
  background: #2d3748; /* Dark grey cards */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const cardHeadingStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: #fedc01; /* Yellow */
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const cardTextStyles = css`
  font-size: 14px;
  color: #d1d5db;
`;

const scheduleItemStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #1f2937; /* Slightly darker grey */
  border-radius: 6px;
  margin-bottom: 10px;
`;

const taskItemStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #1f2937;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const profileCardStyles = css`
  grid-column: span 1;
`;

const itemTextStyles = css`
  font-weight: 500;
  color: #ffffff;
`;

const itemSubtextStyles = css`
  font-size: 12px;
  color: #6b7280; /* Grey */
`;

// StaffDashboard Component
const StaffDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for staff
  const schedule = [
    { id: 'SCH-001', day: 'Monday', time: '9:00 AM - 5:00 PM', role: 'Waiter' },
    { id: 'SCH-002', day: 'Tuesday', time: '10:00 AM - 6:00 PM', role: 'Waiter' },
  ];

  const tasks = [
    { id: 'TSK-001', description: 'Clean tables in section A', status: 'Pending' },
    { id: 'TSK-002', description: 'Restock bar inventory', status: 'Completed' },
  ];

  const profile = {
    name: user?.email,
    role: 'Staff',
    joined: 'Jan 2023',
    shifts: '40 this month',
  };

  // Redirect if not authenticated or not a staff member
  if (!token || user?.role !== 'staff') {
    return <Navigate to="/" replace />;
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div css={contentStyles}>
            {/* Schedule Card */}
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><Calendar size={20} /> Schedule</h3>
              {schedule.map((entry) => (
                <div key={entry.id} css={scheduleItemStyles}>
                  <div>
                    <p css={itemTextStyles}>{entry.day}</p>
                    <p css={itemSubtextStyles}>{entry.time} - {entry.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tasks Card */}
            <div css={cardStyles}>
              <h3 css={cardHeadingStyles}><CheckSquare size={20} /> Tasks</h3>
              {tasks.map((task) => (
                <div key={task.id} css={taskItemStyles}>
                  <div>
                    <p css={itemTextStyles}>{task.description}</p>
                    <p css={itemSubtextStyles}>Status: {task.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Card */}
            <div css={[cardStyles, profileCardStyles]}>
              <h3 css={cardHeadingStyles}><User size={20} /> Profile</h3>
              <p css={cardTextStyles}>Name: {profile.name}</p>
              <p css={cardTextStyles}>Role: {profile.role}</p>
              <p css={cardTextStyles}>Joined: {profile.joined}</p>
              <p css={cardTextStyles}>Shifts: {profile.shifts}</p>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div css={contentStyles}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><Calendar size={20} /> Full Schedule</h3>
              {schedule.map((entry) => (
                <div key={entry.id} css={scheduleItemStyles}>
                  <div>
                    <p css={itemTextStyles}>{entry.day}</p>
                    <p css={itemSubtextStyles}>{entry.time} - {entry.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div css={contentStyles}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><CheckSquare size={20} /> All Tasks</h3>
              {tasks.map((task) => (
                <div key={task.id} css={taskItemStyles}>
                  <div>
                    <p css={itemTextStyles}>{task.description}</p>
                    <p css={itemSubtextStyles}>Status: {task.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div css={contentStyles}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><User size={20} /> Profile Details</h3>
              <p css={cardTextStyles}>Name: {profile.name}</p>
              <p css={cardTextStyles}>Role: {profile.role}</p>
              <p css={cardTextStyles}>Joined: {profile.joined}</p>
              <p css={cardTextStyles}>Shifts: {profile.shifts}</p>
            </div>
          </div>
        );
      default:
        return <div css={cardTextStyles}>Select a section to view its content</div>;
    }
  };

  return (
    <div css={dashboardStyles}>
      {/* StaffHeader */}
      <div css={staffHeaderStyles}>
        <StaffHeader />
      </div>

      {/* Sidebar */}
      <div css={sidebarStyles}>
        <Link to="#" onClick={() => setActiveTab('overview')} css={sidebarLinkStyles} className={activeTab === 'overview' ? 'active' : ''}>
          <Calendar size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('schedule')} css={sidebarLinkStyles} className={activeTab === 'schedule' ? 'active' : ''}>
          <Calendar size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('tasks')} css={sidebarLinkStyles} className={activeTab === 'tasks' ? 'active' : ''}>
          <CheckSquare size={24} />
        </Link>
        <Link to="#" onClick={() => setActiveTab('profile')} css={sidebarLinkStyles} className={activeTab === 'profile' ? 'active' : ''}>
          <User size={24} />
        </Link>
      </div>

      {/* Main Content */}
      <div css={mainContentStyles}>
        {/* Header */}
        <div css={headerStyles}>
          <div css={headerLeftStyles}>
            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fedc01' }}>Staff Dashboard</h1>
          </div>
          <div css={headerRightStyles}>
            <Bell size={20} />
            <div css={userStyles}>
              <img src="https://via.placeholder.com/32" alt="User" />
              <span>{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div css={actionsStyles}>
          <div onClick={() => setActiveTab('schedule')} css={actionBtnStyles}>
            <Calendar size={16} /> View Schedule
          </div>
          <div onClick={() => setActiveTab('tasks')} css={actionBtnStyles}>
            <CheckSquare size={16} /> Manage Tasks
          </div>
          <div onClick={() => setActiveTab('profile')} css={actionBtnStyles}>
            <User size={16} /> View Profile
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default StaffDashboard;