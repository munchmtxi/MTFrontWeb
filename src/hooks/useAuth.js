// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { staffLogin } from '../features/auth/staffAuthThunks'; // Import new thunk

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Manual login (existing, for direct state updates)
  const login = (userData) => {
    dispatch(setUser(userData));
    localStorage.setItem('token', userData.token);
  };

  // Staff login using thunk
  const loginStaff = async (credentials) => {
    try {
      const result = await dispatch(staffLogin(credentials)).unwrap();
      return result; // Optionally return for further handling
    } catch (error) {
      throw error; // Let caller handle the error
    }
  };

  const logout = () => {
    dispatch(setUser(null));
    localStorage.removeItem('token');
  };

  return { 
    user, 
    isAuthenticated, 
    login, // Manual login (kept as is)
    loginStaff, // New staff login method
    logout 
  };
};

export default useAuth;