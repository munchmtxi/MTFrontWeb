import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import socketReducer from '../features/socket/socketSlice';
import merchantProfileReducer from '../features/merchant/merchantProfileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    merchantProfile: merchantProfileReducer,
  },
});

export default store;
