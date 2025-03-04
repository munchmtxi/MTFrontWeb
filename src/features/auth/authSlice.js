 
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    rememberToken: null,
    rememberTokenExpiry: null,
    role: null,
    merchant: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken, rememberToken, rememberTokenExpiry, accessToken } = action.payload;
      state.user = user;
      state.token = token || accessToken; // Handle both `token` and `accessToken` from different endpoints
      state.refreshToken = refreshToken;
      state.rememberToken = rememberToken || null;
      state.rememberTokenExpiry = rememberTokenExpiry || null;
      state.role = user.role;
      state.merchant = user.merchant || null;
      localStorage.setItem('token', state.token);
      localStorage.setItem('refreshToken', refreshToken);
      if (rememberToken) localStorage.setItem('rememberToken', rememberToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.rememberToken = null;
      state.rememberTokenExpiry = null;
      state.role = null;
      state.merchant = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('rememberToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;