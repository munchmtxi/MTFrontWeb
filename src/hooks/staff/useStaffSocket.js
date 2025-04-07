// src/hooks/staff/useStaffSocket.js
'use strict';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '@api/socket/socketApi';
import {
  setSocketConnected,
  addNotification,
  addBookingUpdate,
  addOrderUpdate,
  addQuickLinkUpdate,
  addSubscriptionUpdate,
  addPaymentUpdate,
} from '@features/staff/staffSocketSlice';

const STAFF_EVENTS = {
  STAFF: {
    BOOKING_NOTIFICATION: 'staff:booking_notification',
    BOOKING_ASSIGNED: 'staff:booking_assigned',
    BOOKING_UPDATE: 'staff:booking_update',
    ORDER_NOTIFICATION: 'staff:order_notification',
    ORDER_ASSIGNED: 'staff:order_assigned',
    ORDER_UPDATE: 'staff:order_update',
    QUICK_LINK_REQUEST: 'staff:quick_link_request',
    QUICK_LINK_ASSIGNED: 'staff:quick_link_assigned',
    QUICK_LINK_RESOLVED: 'staff:quick_link_resolved',
    SUBSCRIPTION_NOTIFICATION: 'staff:subscription_notification',
    SUBSCRIPTION_ORDER_ASSIGNED: 'staff:subscription_order_assigned',
    SUBSCRIPTION_UPDATE: 'staff:subscription_update',
    PAYMENT_NOTIFICATION: 'staff:payment_notification',
    PAYMENT_UPDATE: 'staff:payment_update',
    SUCCESS: 'staff:success',
    ERROR: 'staff:error',
  },
};

const useStaffSocket = () => {
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.staffSocket);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token && !isConnected) {
      socket.auth.token = token; // Update token before connecting
      socket.connect();

      socket.on('connect', () => {
        dispatch(setSocketConnected(true));
      });

      socket.on('connect_error', (error) => {
        console.error('Staff socket connect error:', error.message);
        dispatch(setSocketConnected(false));
      });

      socket.on('disconnect', () => {
        dispatch(setSocketConnected(false));
      });

      socket.on('notification', (data) => {
        console.log('Staff notification:', data);
        dispatch(addNotification(data));
      });

      socket.on(STAFF_EVENTS.STAFF.BOOKING_NOTIFICATION, (data) => {
        dispatch(addBookingUpdate({ type: 'notification', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.BOOKING_ASSIGNED, (data) => {
        dispatch(addBookingUpdate({ type: 'assigned', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.BOOKING_UPDATE, (data) => {
        dispatch(addBookingUpdate({ type: 'update', ...data }));
      });

      socket.on(STAFF_EVENTS.STAFF.ORDER_NOTIFICATION, (data) => {
        dispatch(addOrderUpdate({ type: 'notification', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.ORDER_ASSIGNED, (data) => {
        dispatch(addOrderUpdate({ type: 'assigned', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.ORDER_UPDATE, (data) => {
        dispatch(addOrderUpdate({ type: 'update', ...data }));
      });

      socket.on(STAFF_EVENTS.STAFF.QUICK_LINK_REQUEST, (data) => {
        dispatch(addQuickLinkUpdate({ type: 'request', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.QUICK_LINK_ASSIGNED, (data) => {
        dispatch(addQuickLinkUpdate({ type: 'assigned', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.QUICK_LINK_RESOLVED, (data) => {
        dispatch(addQuickLinkUpdate({ type: 'resolved', ...data }));
      });

      socket.on(STAFF_EVENTS.STAFF.SUBSCRIPTION_NOTIFICATION, (data) => {
        dispatch(addSubscriptionUpdate({ type: 'notification', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.SUBSCRIPTION_ORDER_ASSIGNED, (data) => {
        dispatch(addSubscriptionUpdate({ type: 'assigned', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.SUBSCRIPTION_UPDATE, (data) => {
        dispatch(addSubscriptionUpdate({ type: 'update', ...data }));
      });

      socket.on(STAFF_EVENTS.STAFF.PAYMENT_NOTIFICATION, (data) => {
        dispatch(addPaymentUpdate({ type: 'notification', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.PAYMENT_UPDATE, (data) => {
        dispatch(addPaymentUpdate({ type: 'update', ...data }));
      });

      socket.on(STAFF_EVENTS.STAFF.SUCCESS, (data) => {
        dispatch(addNotification({ type: 'success', ...data }));
      });
      socket.on(STAFF_EVENTS.STAFF.ERROR, (error) => {
        console.error('Staff socket error:', error);
        dispatch(addNotification({ type: 'error', ...error }));
      });

      return () => {
        socket.disconnect();
        socket.off('connect');
        socket.off('connect_error');
        socket.off('disconnect');
        socket.off('notification');
        Object.values(STAFF_EVENTS.STAFF).forEach((event) => socket.off(event));
      };
    }
  }, [dispatch, isConnected, token]);

  const emitBookingNotification = (bookingId) => socket.emit(STAFF_EVENTS.STAFF.BOOKING_NOTIFICATION, { bookingId });
  const emitOrderNotification = (orderId) => socket.emit(STAFF_EVENTS.STAFF.ORDER_NOTIFICATION, { orderId });
  const emitQuickLinkRequest = (notificationId) => socket.emit(STAFF_EVENTS.STAFF.QUICK_LINK_REQUEST, { notificationId });
  const emitSubscriptionNotification = (subscriptionId) =>
    socket.emit(STAFF_EVENTS.STAFF.SUBSCRIPTION_NOTIFICATION, { subscriptionId });
  const emitPaymentNotification = (paymentId) => socket.emit(STAFF_EVENTS.STAFF.PAYMENT_NOTIFICATION, { paymentId });

  return {
    socket,
    isConnected,
    emitBookingNotification,
    emitOrderNotification,
    emitQuickLinkRequest,
    emitSubscriptionNotification,
    emitPaymentNotification,
  };
};

export default useStaffSocket;