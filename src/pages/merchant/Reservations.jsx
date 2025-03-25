/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const containerStyle = css`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const reservationListStyle = css`
  display: grid;
  gap: 15px;
`;

const reservationItemStyle = css`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const buttonStyle = css`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const errorStyle = css`
  color: red;
  text-align: center;
`;

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { branchId } = useParams();
  const hasFetched = useRef(false); // Prevent duplicate fetches

  const fetchReservations = async (retries = 3, delay = 1000) => {
    if (!branchId) {
      setError('No branch ID provided');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`/api/merchant/reservation/branches/${branchId}/bookings`);
      setReservations(response.data || []);
      setLoading(false);
      hasFetched.current = true; // Mark as fetched
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchReservations(retries - 1, delay * 2);
      }
      setError(err.response?.data?.message || 'Failed to fetch reservations');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return; // Skip if already fetched
    fetchReservations();
  }, [branchId]); // Still depends on branchId, but guarded by hasFetched

  const cancelReservation = async (reservationId) => {
    try {
      await axios.delete(`/api/merchant/reservation/branches/${branchId}/bookings/${reservationId}`);
      setReservations(reservations.filter((r) => r.id !== reservationId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel reservation');
    }
  };

  return (
    <div css={containerStyle}>
      <h2>Reservations for Branch {branchId}</h2>
      {loading && <LoadingSpinner />}
      {error && <p css={errorStyle}>{error}</p>}
      {reservations.length > 0 ? (
        <div css={reservationListStyle}>
          {reservations.map((reservation) => (
            <div key={reservation.id} css={reservationItemStyle}>
              <p>
                <strong>Table:</strong> {reservation.table?.table_number || 'N/A'} (Branch:{' '}
                {reservation.branch_id || 'N/A'})
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {reservation.booking_date ? new Date(reservation.booking_date).toLocaleDateString() : 'N/A'}
              </p>
              <p>
                <strong>Time:</strong> {reservation.booking_time || 'N/A'}
              </p>
              <p>
                <strong>Guests:</strong> {reservation.guest_count || 'N/A'}
              </p>
              <p>
                <strong>Customer:</strong>{' '}
                {reservation.customer?.user?.first_name || reservation.customer?.user?.email || 'N/A'}
              </p>
              <button
                css={buttonStyle}
                onClick={() => cancelReservation(reservation.id)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No reservations found for this branch.</p>
      )}
    </div>
  );
}
