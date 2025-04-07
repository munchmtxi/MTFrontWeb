// src/features/staff/staffSocketSlice.js
'use strict';

import { createSlice } from '@reduxjs/toolkit';

const staffSocketSlice = createSlice({
  name: 'staffSocket',
  initialState: {
    isConnected: false,
    notifications: [], // General notifications (e.g., in-app messages)
    bookings: [], // Booking-related updates
    orders: [], // Order-related updates
    quickLinks: [], // Quick link requests
    subscriptions: [], // Subscription updates
    payments: [], // Payment updates
  },
  reducers: {
    setSocketConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    addBookingUpdate: (state, action) => {
      state.bookings.push(action.payload);
    },
    addOrderUpdate: (state, action) => {
      state.orders.push(action.payload);
    },
    addQuickLinkUpdate: (state, action) => {
      state.quickLinks.push(action.payload);
    },
    addSubscriptionUpdate: (state, action) => {
      state.subscriptions.push(action.payload);
    },
    addPaymentUpdate: (state, action) => {
      state.payments.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.bookings = [];
      state.orders = [];
      state.quickLinks = [];
      state.subscriptions = [];
      state.payments = [];
    },
  },
});

export const {
  setSocketConnected,
  addNotification,
  addBookingUpdate,
  addOrderUpdate,
  addQuickLinkUpdate,
  addSubscriptionUpdate,
  addPaymentUpdate,
  clearNotifications,
} = staffSocketSlice.actions;
export default staffSocketSlice.reducer;