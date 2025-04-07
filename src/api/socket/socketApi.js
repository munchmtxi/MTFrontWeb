// src/api/socket/socketApi.js
'use strict';

import { io } from 'socket.io-client';
import store from '@/store';

const getToken = () => {
  const token = store.getState().auth.token || localStorage.getItem('token');
  console.log('Socket auth token:', token);
  return token;
};

const socket = io('http://localhost:3000', {
  autoConnect: false,
  transports: ['websocket'],
  auth: {
    token: getToken(), // Initial token
  },
});

socket.on('connect', () => {
  console.log('Staff socket connected:', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message, error);
});

socket.on('reconnect_attempt', () => {
  socket.auth.token = getToken(); // Update token before reconnect
  console.log('Reconnect attempt with token:', socket.auth.token);
});

socket.on('disconnect', () => {
  console.log('Staff socket disconnected');
});

export default socket;