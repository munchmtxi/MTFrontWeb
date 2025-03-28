/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import useBookings from '../../hooks/useBookings';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Plus, UserPlus, CheckCircle, X } from 'lucide-react';

// Styles aligned with CustomerDashboard, minimal and smooth
const dashboardStyles = css`
  min-height: 100vh;
  background: #000;
  color: #fff;
  font-family: 'Inter', sans-serif;
  padding: 20px;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const headerStyles = css`
  background: #111;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const headingStyles = css`
  font-size: 20px;
  font-weight: 600;
  color: #1dbf1d;
`;

const contentStyles = css`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const sectionStyles = css`
  background: #222;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
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

const buttonStyles = css`
  padding: 8px 16px;
  background: #1dbf1d;
  color: #000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    background: #17a317;
  }
  &:disabled {
    background: #888;
    cursor: not-allowed;
  }
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
  &:hover {
    color: #17a317;
  }
`;

const tableListStyles = css`
  display: grid;
  gap: 10px;
`;

const tableItemStyles = css`
  padding: 10px;
  background: #111;
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

const subHeadingStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: #1dbf1d;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const inviteListStyles = css`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;

const inviteItemStyles = css`
  padding: 10px;
  background: #111;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function TableBookings() {
  const [formData, setFormData] = useState({
    branchId: '',
    bookingDate: '',
    bookingTime: '',
    guestCount: 1,
  });
  const [inviteData, setInviteData] = useState({ type: 'email', value: '' });
  const [invites, setInvites] = useState([]);
  const [showInvites, setShowInvites] = useState(false);
  const { availableTables, loading, error, getAvailableTables, bookTable } = useBookings();

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
      invites: invites, // Include invited friends
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
      <div css={headerStyles}>
        <h1 css={headingStyles}>Table Booking Dashboard</h1>
      </div>

      <div css={contentStyles}>
        {/* Booking Form */}
        <div css={sectionStyles}>
          <h3 css={subHeadingStyles}>Book a Table</h3>
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

        {/* Toggleable Invite Friends */}
        <div css={sectionStyles}>
          <button
            css={toggleButtonStyles}
            onClick={() => setShowInvites(!showInvites)}
          >
            <CheckCircle size={20} /> Add Friends
          </button>
          {showInvites && (
            <div css={css`margin-top: 15px;`}>
              <h3 css={subHeadingStyles}><UserPlus size={20} /> Invite Friends</h3>
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
                      <span>{invite.type === 'email' ? invite.value : `User #${invite.value}`}</span>
                      <X size={16} css={css`cursor: pointer;`} onClick={() => removeInvite(index)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Available Tables */}
        {availableTables.length > 0 && (
          <div css={sectionStyles}>
            <h3 css={subHeadingStyles}>Available Tables</h3>
            <div css={tableListStyles}>
              {availableTables.map((table) => (
                <div key={table.tableId} css={tableItemStyles}>
                  <span>Table {table.tableNumber} (Capacity: {table.capacity})</span>
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
  );
}