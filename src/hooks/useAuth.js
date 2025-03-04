 
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout } from '../features/auth/authSlice';
import { useRefreshToken } from '../api/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, refreshToken, role, merchant } = useSelector((state) => state.auth);
  const { mutate: refresh } = useRefreshToken();

  const isAuthenticated = !!token;

  const refreshAuth = () => {
    if (refreshToken) {
      refresh(refreshToken, {
        onSuccess: (response) => {
          dispatch(setCredentials(response));
        },
        onError: () => {
          dispatch(logout());
        },
      });
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { user, token, refreshToken, role, merchant, isAuthenticated, refreshAuth, logoutUser };
};