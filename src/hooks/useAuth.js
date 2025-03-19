import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const login = (userData) => {
    dispatch(setUser(userData));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    dispatch(setUser(null));
    localStorage.removeItem('token');
  };

  return { user, isAuthenticated, login, logout };
};

export default useAuth;