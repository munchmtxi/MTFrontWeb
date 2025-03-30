/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { X, Calendar, Utensils, QrCode, Package, Plus, UserPlus, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCart } from '@hooks/useCart';
import useBookings from '../../hooks/useBookings';

// Modal overlay styling
const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal container styling
const modalContainerStyles = css`
  background: #000;
  border: 1px solid #1dbf1d;
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  width: 90%;
  position: relative;
`;

// Close button styling
const closeButtonStyles = css`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #1dbf1d;
  cursor: pointer;
  &:hover {
    color: #17a317;
  }
`;

// Reusable card styles
const cardStyles = css`
  background: #111;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
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

// Form styling
const formStyles = css`
  display: grid;
  gap: 15px;
  & label {
    color: #ccc;
    font-size: 14px;
    margin-bottom: 5px;
  }
  & input,
  & select {
    padding: 10px;
    background: #333;
    border: 1px solid #444;
    border-radius: 6px;
    color: #e0e0e0;
    width: 100%;
    &:focus {
      border-color: #1dbf1d;
      outline: none;
    }
  }
`;

// List styling for available tables and invites
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

// Button styling with our signature green
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
  &:hover {
    background: #17a317;
  }
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

// Toggle button for showing invites
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

// Error message styling
const errorStyles = css`
  color: #ff4d4d;
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
`;

const TableBookingModal = ({ onClose }) => {
  const { cart } = useCart();
  const { availableTables, loading, error, getAvailableTables, bookTable } = useBookings();
  const [formData, setFormData] = useState({
    branchId: '',
    bookingDate: '',
    bookingTime: '',
    guestCount: 1,
  });
  const [inviteData, setInviteData] = useState({ type: 'email', value: '' });
  const [invites, setInvites] = useState([]);
  const [showInvites, setShowInvites] = useState(false);

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
      merchantId: 'someMerchantId', // Replace with actual merchant ID as needed
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
    <div css={overlayStyles}>
      <div css={modalContainerStyles}>
        <button css={closeButtonStyles} onClick={onClose}>
          <X size={20} />
        </button>
        {/* Booking Form */}
        <div css={cardStyles}>
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
        {/* Invite Friends Section */}
        <div css={cardStyles} style={{ marginTop: '20px' }}>
          <button css={toggleButtonStyles} onClick={() => setShowInvites(!showInvites)}>
            <CheckCircle size={20} /> Add Friends
          </button>
          {showInvites && (
            <div css={css`margin-top: 15px;`}>
              <h3 css={cardHeadingStyles}><UserPlus size={20} /> Invite Friends</h3>
              <div css={formStyles}>
                <label>
                  Invite By:
                  <select name="type" value={inviteData.type} onChange={handleInviteChange}>
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
                <button css={buttonStyles} type="button" onClick={addInvite}>
                  <Plus size={16} /> Add Invite
                </button>
              </div>
              {invites.length > 0 && (
                <div css={inviteListStyles}>
                  {invites.map((invite, index) => (
                    <div key={index} css={inviteItemStyles}>
                      <span css={cardTextStyles}>
                        {invite.type === 'email' ? invite.value : `User #${invite.value}`}
                      </span>
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
          <div css={cardStyles} style={{ marginTop: '20px' }}>
            <h3 css={cardHeadingStyles}>Available Tables</h3>
            <div css={tableListStyles}>
              {availableTables.map((table) => (
                <div key={table.tableId} css={tableItemStyles}>
                  <span css={cardTextStyles}>Table {table.tableNumber} (Capacity: {table.capacity})</span>
                  <button css={buttonStyles} onClick={() => handleReserve(table.tableId)} disabled={loading}>
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
};

export default TableBookingModal;
