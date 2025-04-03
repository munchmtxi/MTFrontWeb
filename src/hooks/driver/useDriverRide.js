// src/hooks/driver/useDriverRide.js
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  fetchActiveRide,
  updateLocation,
  acceptRideThunk,
  completeRideThunk,
  setActiveRideFromSocket,
  setLocationFromSocket,
} from '../../features/driver/driverRideSlice';

const SOCKET_URL = 'http://localhost:3000';

export const useDriverRide = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { activeRide, driverLocation, status, error } = useSelector((state) => state.driverRide);

  // WebSocket setup
  useEffect(() => {
    if (!token || user?.role !== 'driver') return;

    // Connect directly to the /driver namespace
    const socket = io(`${SOCKET_URL}/driver`, {
      path: '/socket.io',
      query: { token },
    });

    socket.on('connect', () => {
      console.log('Connected to driver namespace');
      socket.emit('authenticate', token);
    });

    socket.on('authenticated', (data) => {
      console.log('Authenticated:', data);
    });

    socket.on('rideAssigned', (rideData) => {
      dispatch(setActiveRideFromSocket(rideData));
    });

    socket.on('locationUpdated', (data) => {
      dispatch(setLocationFromSocket(data.location));
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, token, user]);

  const fetchRide = useCallback(() => {
    if (!token) {
      console.warn('No token available for fetching ride');
      return;
    }
    dispatch(fetchActiveRide());
  }, [dispatch, token]);

  const updateDriverLoc = useCallback((location) => {
    if (!token) {
      console.warn('No token available for updating location');
      return;
    }
    dispatch(updateLocation(location));
  }, [dispatch, token]);

  const accept = useCallback((rideId) => {
    if (!token) {
      console.warn('No token available for accepting ride');
      return;
    }
    dispatch(acceptRideThunk(rideId));
  }, [dispatch, token]);

  const complete = useCallback((rideId) => {
    if (!token) {
      console.warn('No token available for completing ride');
      return;
    }
    dispatch(completeRideThunk(rideId));
  }, [dispatch, token]);

  return {
    activeRide,
    driverLocation,
    status,
    error,
    fetchRide,
    updateDriverLoc,
    accept,
    complete,
  };
};