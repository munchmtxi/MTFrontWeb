import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { staffLogin } from '../features/auth/staffAuthThunks';
import { driverLogin } from '../features/auth/driverAuthThunks';
import { customerLogin } from '../features/auth/customerAuthThunks'; // New

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const login = (userData) => {
    dispatch(setUser(userData));
    localStorage.setItem('token', userData.token);
  };

  const loginStaff = async (credentials) => {
    try {
      const result = await dispatch(staffLogin(credentials)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const loginDriver = async (credentials) => {
    try {
      const result = await dispatch(driverLogin(credentials)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const loginCustomer = async (credentials) => {
    try {
      const result = await dispatch(customerLogin(credentials)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    dispatch(setUser(null));
    localStorage.removeItem('token');
  };

  return { 
    user, 
    isAuthenticated, 
    login, 
    loginStaff, 
    loginDriver,
    loginCustomer,
    logout 
  };
};

export default useAuth;