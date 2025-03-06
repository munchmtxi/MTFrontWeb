// C:\Users\munch\Desktop\MTFrontWeb\src\store\index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import socketReducer from '../features/socket/socketSlice';
import geolocationReducer from '../features/common/geolocationSlice';
import excelReducer from '../features/common/excelSlice'; // New import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    geolocation: geolocationReducer,
    excel: excelReducer, // Add excel reducer
  },
});