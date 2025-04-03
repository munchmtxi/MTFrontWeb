// src/api/driver/driverRideApi.js
import axios from '../axios';

const API_BASE_URL = '/api/v1/driver';

export const matchDriverToRide = async (rideId) => {
  const response = await axios.post(`${API_BASE_URL}/rides/${rideId}/match`);
  return response.data.data;
};

export const acceptRide = async (rideId) => {
  const response = await axios.patch(`${API_BASE_URL}/rides/${rideId}/accept`);
  return response.data.data;
};

export const completeRide = async (rideId) => {
  const response = await axios.patch(`${API_BASE_URL}/rides/${rideId}/complete`);
  return response.data.data;
};

export const updateDriverLocation = async (location) => {
  const response = await axios.patch(`${API_BASE_URL}/location`, { lat: location.lat, lng: location.lng });
  return response.data.data;
};

export const getActiveRide = async () => {
  const response = await axios.get(`${API_BASE_URL}/rides/active`);
  return response.data.data;
};