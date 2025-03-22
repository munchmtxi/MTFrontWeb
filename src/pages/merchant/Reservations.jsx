/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, createBooking } from '../../features/merchant/reservation/reservationThunks';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const reservationsStyles = (theme) => css`
  padding: ${theme.spacing[6]};
  max-width: ${theme.breakpoints['2xl']};
  margin: 0 auto;
`;

const tableStyles = (theme) => css`
  width: 100%;
  border-collapse: collapse;
  background-color: ${theme.components.card.baseStyle.backgroundColor};
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
`;

const thStyles = (theme) => css`
  padding: ${theme.spacing[3]};
  text-align: left;
  background-color: ${theme.greenScale[700]};
  color: #ffffff;
  font-weight: ${theme.typography.fontWeights.semibold};
`;

const tdStyles = (theme) => css`
  padding: ${theme.spacing[3]};
  border-bottom: 1px solid ${theme.grayScale[800]};
`;

const formStyles = (theme) => css`
  margin-bottom: ${theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
  max-width: 400px;
`;

const inputStyles = (theme) => css`
  ${theme.components.input.baseStyle};
  width: 100%;
`;

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
`;

const Reservations = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.reservation);
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    customer_id: user?.id || '',
    booking_date: '',
    booking_time: '',
    guest_count: '',
    special_requests: '',
    seating_preference: 'no_preference',
    occasion: '',
    source: 'app',
  });

  useEffect(() => {
    dispatch(fetchBookings({ branchId: '1' })); // Hardcoded for now
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking({
      branchId: '1', // Hardcoded for now
      bookingData: {
        ...formData,
        guest_count: parseInt(formData.guest_count, 10),
      },
    }));
    setFormData({
      customer_id: user?.id || '',
      booking_date: '',
      booking_time: '',
      guest_count: '',
      special_requests: '',
      seating_preference: 'no_preference',
      occasion: '',
      source: 'app',
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div css={css`color: red;`}>Error: {error}</div>;

  return (
    <div css={reservationsStyles(theme)}>
      <h1 css={css`font-size: ${theme.typography.fontSizes['3xl']}; margin-bottom: ${theme.spacing[4]};`}>Reservations</h1>
      
      {/* Booking Form */}
      <form css={formStyles(theme)} onSubmit={handleSubmit}>
        <input
          css={inputStyles(theme)}
          type="date"
          name="booking_date"
          value={formData.booking_date}
          onChange={handleInputChange}
          required
        />
        <input
          css={inputStyles(theme)}
          type="time"
          name="booking_time"
          value={formData.booking_time}
          onChange={handleInputChange}
          required
        />
        <input
          css={inputStyles(theme)}
          type="number"
          name="guest_count"
          value={formData.guest_count}
          onChange={handleInputChange}
          min="1"
          required
        />
        <input
          css={inputStyles(theme)}
          type="text"
          name="special_requests"
          value={formData.special_requests}
          onChange={handleInputChange}
          placeholder="Special Requests"
        />
        <select
          css={inputStyles(theme)}
          name="seating_preference"
          value={formData.seating_preference}
          onChange={handleInputChange}
        >
          <option value="no_preference">No Preference</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
          <option value="window">Window</option>
        </select>
        <input
          css={inputStyles(theme)}
          type="text"
          name="occasion"
          value={formData.occasion}
          onChange={handleInputChange}
          placeholder="Occasion (e.g., Birthday)"
        />
        <button css={buttonStyles(theme)} type="submit">Create Booking</button>
      </form>

      {/* Bookings Table */}
      {bookings.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table css={tableStyles(theme)}>
          <thead>
            <tr>
              <th css={thStyles(theme)}>Reference</th>
              <th css={thStyles(theme)}>Date</th>
              <th css={thStyles(theme)}>Time</th>
              <th css={thStyles(theme)}>Guests</th>
              <th css={thStyles(theme)}>Status</th>
              <th css={thStyles(theme)}>Requests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td css={tdStyles(theme)}>{booking.reference}</td>
                <td css={tdStyles(theme)}>{booking.booking_date}</td>
                <td css={tdStyles(theme)}>{booking.booking_time}</td>
                <td css={tdStyles(theme)}>{booking.guest_count}</td>
                <td css={tdStyles(theme)}>{booking.status}</td>
                <td css={tdStyles(theme)}>{booking.special_requests || 'None'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reservations;