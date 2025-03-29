/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useBookings from '../../hooks/useBookings';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  Bell,
  Calendar,
  Car,
  Headphones,
  QrCode,
  Settings,
  ShoppingCart,
  User,
  Utensils,
  Package,
  Plus,
  UserPlus,
  CheckCircle,
  X,
} from 'lucide-react';
import { useCart } from '@hooks/useCart';

// Styles from CustomerDashboard
const dashboardStyles = css`
  min-height: 100vh;
  background: #000;
  color: #fff;
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
  color: #fff;
  transition: color 0.3s ease;
`;

const sidebarLinkStyles = css`
  display: block;
  &.active .icon-wrapper { background-color: #1dbf1d; }
  &.active .icon { color: #000; }
  &:hover .icon-wrapper { background-color: #1dbf1d; }
  &:hover .icon { color: #000; }
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px 0;
  padding-top: 15px;
  @media (max-width: 768px) { padding: 10px; }
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
    color: #fff;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover { color: #1dbf1d; }
  }
`;

const dropdownStyle = css`
  position: relative;
  display: inline-block;
`;

const dropdownContentStyle = css`
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 8px;
  &.show { display: block; }
`;

const dropdownLinkStyle = css`
  color: black;
  padding: 0.5rem 1rem;
  text-decoration: none;
  display: block;
  &:hover { background-color: #f1f1f1; }
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
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover { background: #17a317; }
  &:disabled { background: #555; cursor: not-allowed; }
`;

const toggleButtonStyles = css`
  background: none;
  border: none;
  color: #1dbf1d;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  transition: color 0.3s ease;
  &:hover { color: #17a317; }
`;

const formStyles = css`
  display: grid;
  gap: 15px;
  & label {
    color: #ccc;
    font-size: 14px;
    margin-bottom: 5px;
  }
  & input, & select {
    padding: 10px;
    background: #333;
    border: 1px solid #444;
    border-radius: 6px;
    color: #fff;
    width: 100%;
    &:focus {
      border-color: #1dbf1d;
      outline: none;
    }
  }
`;

const tableListStyles = css`
  display: grid;
  gap: 10px;
`;

const tableItemStyles = css`
  padding: 10px;
  background: #222;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const errorStyles = css`
  color: #ff4d4d;
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
`;

const inviteListStyles = css`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;

const inviteItemStyles = css`
  padding: 10px;
  background: #222;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function TableBookings() {
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    branchId: '',
    bookingDate: '',
    bookingTime: '',
    guestCount: 1,
  });
  const [inviteData, setInviteData] = useState({ type: 'email', value: '' });
  const [invites, setInvites] = useState([]);
  const [showInvites, setShowInvites] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { availableTables, loading, error, getAvailableTables, bookTable } = useBookings();

  if (!token || user?.role !== 'customer') return <Navigate to="/" replace />;

  const profile = {
    email: user?.email || 'john.doe@example.com',
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAvailableTables({
      branchId: formData.branchId,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
    });
  };

  const handleReserve = (tableId) => {
    bookTable({
      merchantId: 'someMerchantId', // Replace with actual merchant ID
      branchId: formData.branchId,
      tableId,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
      guestCount: Number(formData.guestCount),
      invites: invites,
    });
  };

  const handleInviteChange = (e) => {
    setInviteData({ ...inviteData, [e.target.name]: e.target.value });
  };

  const addInvite = () => {
    if (inviteData.value) {
      setInvites([...invites, { type: inviteData.type, value: inviteData.value }]);
      setInviteData({ ...inviteData, value: '' });
    }
  };

  const removeInvite = (index) => {
    setInvites(invites.filter((_, i) => i !== index));
  };

  return (
    <div css={dashboardStyles}>
      <div css={sidebarStyles}>
        <Link
          to="/customer/table-bookings"
          css={sidebarLinkStyles}
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Calendar size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={activeTab === 'order' ? 'active' : ''}
          onClick={() => setActiveTab('order')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Utensils size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="/customer/rides"
          css={sidebarLinkStyles}
          className={activeTab === 'rides' ? 'active' : ''}
          onClick={() => setActiveTab('rides')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Car size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={activeTab === 'checkin' ? 'active' : ''}
          onClick={() => setActiveTab('checkin')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <QrCode size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Package size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Settings size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Headphones size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <h1 css={css`font-size: 18px; font-weight: 600; color: #1dbf1d;`}>Good Day, {profile.email}!</h1>
          <div css={headerRightStyles}>
            <Bell size={20} onClick={() => console.log('Notifications clicked')} />
            <Link to="/customer/cart" css={css`position: relative;`}>
              <ShoppingCart size={20} />
              {cart.items.length > 0 && <span css={badgeStyles}>{cart.items.length}</span>}
            </Link>
            <div css={dropdownStyle}>
              <User size={20} onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} />
              <div css={dropdownContentStyle} className={profileDropdownOpen ? 'show' : ''}>
                <Link
                  to="#"
                  css={dropdownLinkStyle}
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setActiveTab('profile');
                  }}
                >
                  View Profile
                </Link>
                <Link
                  to="/customer/profile/edit"
                  css={dropdownLinkStyle}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Edit Profile
                </Link>
                <Link
                  to="/customer/profile/password"
                  css={dropdownLinkStyle}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Change Password
                </Link>
                <Link
                  to="/customer/profile/payment"
                  css={dropdownLinkStyle}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Payment Methods
                </Link>
                <Link to="/logout" css={dropdownLinkStyle} onClick={() => setProfileDropdownOpen(false)}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
          <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
            <h3 css={cardHeadingStyles}><Calendar size={20} /> Book a Table</h3>
            <form css={formStyles} onSubmit={handleSubmit}>
              <label>
                Branch:
                <input
                  type="text"
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleChange}
                  placeholder="Enter Branch ID"
                  required
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Time:
                <input
                  type="time"
                  name="bookingTime"
                  value={formData.bookingTime}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Guests:
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </label>
              <button type="submit" css={buttonStyles} disabled={loading}>
                Find Tables
              </button>
            </form>
          </div>

          <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
            <button
              css={toggleButtonStyles}
              onClick={() => setShowInvites(!showInvites)}
            >
              <CheckCircle size={20} /> Add Friends
            </button>
            {showInvites && (
              <div css={css`margin-top: 15px;`}>
                <h3 css={cardHeadingStyles}><UserPlus size={20} /> Invite Friends</h3>
                <div css={formStyles}>
                  <label>
                    Invite By:
                    <select
                      name="type"
                      value={inviteData.type}
                      onChange={handleInviteChange}
                    >
                      <option value="email">Email</option>
                      <option value="userId">User ID</option>
                    </select>
                  </label>
                  <label>
                    {inviteData.type === 'email' ? 'Email:' : 'User ID:'}
                    <input
                      type="text"
                      name="value"
                      value={inviteData.value}
                      onChange={handleInviteChange}
                      placeholder={inviteData.type === 'email' ? 'Enter email' : 'Enter User ID'}
                    />
                  </label>
                  <button css={buttonStyles} onClick={addInvite}>
                    <Plus size={16} /> Add Invite
                  </button>
                </div>
                {invites.length > 0 && (
                  <div css={inviteListStyles}>
                    {invites.map((invite, index) => (
                      <div key={index} css={inviteItemStyles}>
                        <span css={cardTextStyles}>{invite.type === 'email' ? invite.value : `User #${invite.value}`}</span>
                        <X size={16} css={css`cursor: pointer;`} onClick={() => removeInvite(index)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {availableTables.length > 0 && (
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}>Available Tables</h3>
              <div css={tableListStyles}>
                {availableTables.map((table) => (
                  <div key={table.tableId} css={tableItemStyles}>
                    <span css={cardTextStyles}>Table {table.tableNumber} (Capacity: {table.capacity})</span>
                    <button
                      css={buttonStyles}
                      onClick={() => handleReserve(table.tableId)}
                      disabled={loading}
                    >
                      Reserve
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && <LoadingSpinner />}
          {error && <p css={errorStyles}>{error}</p>}
        </div>
      </div>
    </div>
  );
}