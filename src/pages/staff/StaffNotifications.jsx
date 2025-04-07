/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import useStaffSocket from '@hooks/staff/useStaffSocket';
import { Bell, Calendar, Truck, Link as LinkIcon, CreditCard, Package } from 'lucide-react';

// Styles (reusing some from StaffDashboard)
const containerStyles = css`
  min-height: 100vh;
  background: #1a202c;
  color: #d1d5db;
  font-family: 'Inter', sans-serif;
  padding: 20px;
`;

const headerStyles = css`
  font-size: 20px;
  font-weight: 600;
  color: #fedc01;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const sectionStyles = css`
  margin-bottom: 20px;
`;

const listStyles = css`
  list-style: none;
  padding: 0;
`;

const itemStyles = css`
  background: #2d3748;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const iconStyles = css`
  color: #fedc01;
`;

const textStyles = css`
  flex: 1;
`;

const StaffNotifications = () => {
  const { isConnected } = useStaffSocket();
  const { notifications, bookings, orders, quickLinks, subscriptions, payments } = useSelector(
    (state) => state.staffSocket
  );

  return (
    <div css={containerStyles}>
      <h1 css={headerStyles}>
        <Bell size={24} /> Staff Notifications
      </h1>
      <p>Socket Status: {isConnected ? 'Connected' : 'Disconnected'}</p>

      <section css={sectionStyles}>
        <h2>General Notifications</h2>
        <ul css={listStyles}>
          {notifications.map((notif, index) => (
            <li key={index} css={itemStyles}>
              <Bell css={iconStyles} size={18} />
              <span css={textStyles}>
                {notif.message} - {new Date(notif.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
          {notifications.length === 0 && <li css={textStyles}>No notifications</li>}
        </ul>
      </section>

      <section css={sectionStyles}>
        <h2>Bookings</h2>
        <ul css={listStyles}>
          {bookings.map((booking, index) => (
            <li key={index} css={itemStyles}>
              <Calendar css={iconStyles} size={18} />
              <span css={textStyles}>
                {booking.type === 'notification' && `New Booking #${booking.bookingId}`}
                {booking.type === 'assigned' && `Assigned Booking #${booking.bookingId}`}
                {booking.type === 'update' && `Booking #${booking.bookingId} - Status: ${booking.status}`} -{' '}
                {new Date(booking.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
          {bookings.length === 0 && <li css={textStyles}>No booking updates</li>}
        </ul>
      </section>

      <section css={sectionStyles}>
        <h2>Orders</h2>
        <ul css={listStyles}>
          {orders.map((order, index) => (
            <li key={index} css={itemStyles}>
              <Truck css={iconStyles} size={18} />
              <span css={textStyles}>
                {order.type === 'notification' && `New Order #${order.orderId}`}
                {order.type === 'assigned' && `Assigned Order #${order.orderId}`}
                {order.type === 'update' && `Order #${order.orderId} - Status: ${order.status}`} -{' '}
                {new Date(order.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
          {orders.length === 0 && <li css={textStyles}>No order updates</li>}
        </ul>
      </section>

      <section css={sectionStyles}>
        <h2>Quick Links</h2>
        <ul css={listStyles}>
          {quickLinks.map((link, index) => (
            <li key={index} css={itemStyles}>
              <LinkIcon css={iconStyles} size={18} />
              <span css={textStyles}>
                {link.type === 'request' && `New Request #${link.notificationId}`}
                {link.type === 'assigned' && `Assigned Request #${link.notificationId}`}
                {link.type === 'resolved' && `Resolved Request #${link.notificationId}`} -{' '}
                {new Date(link.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
          {quickLinks.length === 0 && <li css={textStyles}>No quick link updates</li>}
        </ul>
      </section>

      <section css={sectionStyles}>
        <h2>Subscriptions</h2>
        <ul css={listStyles}>
          {subscriptions.map((sub, index) => (
            <li key={index} css={itemStyles}>
              <Package css={iconStyles} size={18} />
              <span css={textStyles}>
                {sub.type === 'notification' && `New Subscription #${sub.subscriptionId}`}
                {sub.type === 'assigned' && `Assigned Order #${sub.orderId} from Subscription #${sub.subscriptionId}`}
                {sub.type === 'update' && `Subscription #${sub.subscriptionId} - Payment: ${sub.paymentStatus}`} -{' '}
                {new Date(sub.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
          {subscriptions.length === 0 && <li css={textStyles}>No subscription updates</li>}
        </ul>
      </section>

      <section css={sectionStyles}>
        <h2>Payments</h2>
        <ul css={listStyles}>
          {payments.map((payment, index) => (
            <li key={index} css={itemStyles}>
              <CreditCard css={iconStyles} size={18} />
              <span css={textStyles}>
                {payment.type === 'notification' && `New Payment #${payment.paymentId}`}
                {payment.type === 'update' && `Payment #${payment.paymentId} - Status: ${payment.status}`} -{' '}
                {new Date(payment.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
          {payments.length === 0 && <li css={textStyles}>No payment updates</li>}
        </ul>
      </section>
    </div>
  );
};

export default StaffNotifications;