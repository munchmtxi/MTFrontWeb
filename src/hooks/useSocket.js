import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../api/socket/socketApi';
import { setSocketConnected } from '../features/socket/socketSlice';

const useSocket = () => {
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.socket);

  useEffect(() => {
    if (!isConnected) {
      socket.connect();

      socket.on('connect', () => {
        dispatch(setSocketConnected(true));
      });

      socket.on('disconnect', () => {
        dispatch(setSocketConnected(false));
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }
  }, [dispatch, isConnected]);

  return socket;
};

export default useSocket;