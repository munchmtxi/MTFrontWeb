import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../utils/socket';
import { setConnected, addEvent } from '../features/socket/socketSlice';
import { addUpdate } from '../features/common/geolocationSlice';

export const useSocket = () => {
  const dispatch = useDispatch();
  const { role, id } = useSelector((state) => state.auth.user || {});

  useEffect(() => {
    // If no user (id or role), don’t connect
    if (!id || !role) {
      socket.disconnect();
      return;
    }

    // Connect socket when user is present
    socket.connect();

    // General socket events
    socket.on('connect', () => dispatch(setConnected(true)));
    socket.on('disconnect', () => dispatch(setConnected(false)));
    socket.on('orderCreated', (data) =>
      dispatch(addEvent({ type: 'orderCreated', data }))
    );
    socket.on('error', (error) => console.error('Socket error:', error.message));

    // Join role and user rooms
    socket.emit('join', `role:${role}`);
    socket.emit('join', `user:${id}`);

    // Geolocation-specific events
    socket.emit('subscribe:geolocation', id);
    socket.on('geolocationUpdate', (data) => {
      dispatch(addUpdate(data));
    });

    // Cleanup on unmount or user change
    return () => {
      socket.emit('unsubscribe:geolocation', id);
      socket.off('connect');
      socket.off('disconnect');
      socket.off('orderCreated');
      socket.off('error');
      socket.off('geolocationUpdate');
      socket.disconnect();
    };
  }, [role, id, dispatch]); // Depend on role, id, and dispatch

  return { socket };
};