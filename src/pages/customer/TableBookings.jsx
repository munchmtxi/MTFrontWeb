/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import useBookings from '../../hooks/useBookings';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const containerStyle = css`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const tableListStyle = css`
  display: grid;
  gap: 10px;
`;

const tableItemStyle = css`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonStyle = css`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const errorStyle = css`
  color: red;
  text-align: center;
`;

export default function TableBookings() {
  const [formData, setFormData] = useState({
    branchId: '',
    bookingDate: '',
    bookingTime: '',
    guestCount: 1,
  });
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
      merchantId: 'someMerchantId', // Replace with actual merchant ID from context or props
      branchId: formData.branchId,
      tableId,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
      guestCount: Number(formData.guestCount),
    });
  };

  return (
    <div css={containerStyle}>
      <h2>Book a Table</h2>
      <form css={formStyle} onSubmit={handleSubmit}>
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
        <button type="submit" css={buttonStyle} disabled={loading}>
          Find Tables
        </button>
      </form>

      {loading && <LoadingSpinner />}
      {error && <p css={errorStyle}>{error}</p>}

      {availableTables.length > 0 && (
        <div css={tableListStyle}>
          <h3>Available Tables</h3>
          {availableTables.map((table) => (
            <div key={table.tableId} css={tableItemStyle}>
              <span>Table {table.tableNumber} (Capacity: {table.capacity})</span>
              <button
                css={buttonStyle}
                onClick={() => handleReserve(table.tableId)}
                disabled={loading}
              >
                Reserve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}