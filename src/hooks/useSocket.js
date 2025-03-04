 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../utils/socket';
import { setConnected, addEvent } from '../features/socket/socketSlice';

export const useSocket = () => {
  const dispatch = useDispatch();
  const { role, id } = useSelector((state) => state.auth.user || {});

  useEffect(() => {
    socket.on('connect', () => dispatch(setConnected(true)));
    socket.on('disconnect', () => dispatch(setConnected(false)));
    socket.on('orderCreated', (data) => dispatch(addEvent({ type: 'orderCreated', data })));
    socket.on('error', (error) => console.error('Socket error:', error.message));

    if (role && id) {
      socket.emit('join', `role:${role}`);
      socket.emit('join', `user:${id}`);
    }

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('orderCreated');
      socket.off('error');
    };
  }, [role, id, dispatch]);

  return { socket };
};