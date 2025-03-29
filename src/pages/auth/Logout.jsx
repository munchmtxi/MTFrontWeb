/** @jsxImportSource @emotion/react */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/authSlice'; // Assuming this action exists

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear auth state
    navigate('/', { replace: true });
  };

  return (
    <div css={{ padding: '20px', textAlign: 'center' }}>
      <h2>Logging Out...</h2>
      <button onClick={handleLogout} css={{ padding: '10px 20px' }}>
        Confirm Logout
      </button>
    </div>
  );
};

export default Logout;