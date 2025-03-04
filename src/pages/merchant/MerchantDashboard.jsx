 
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../hooks/useSocket';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { logout as logoutAction } from '../../features/auth/authSlice';
import { useLogout } from '../../api/authApi';

const fetchProfile = async (token) => {
  const response = await axios.get('http://localhost:3000/merchant/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export default function MerchantDashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const { socket } = useSocket();
  const { events } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const { mutate: logout } = useLogout();

  const { data: profile, isLoading: profileLoading } = useQuery(
    ['merchantProfile', user?.id],
    () => fetchProfile(token),
    { enabled: !!token }
  );

  const { register, handleSubmit } = useForm();

  const handleOrderCreate = () => {
    socket.emit('orderCreated', { orderId: '123', merchantId: user.id });
  };

  const handleLogout = () => {
    logout({ deviceId: 'some-device-id', clearAllDevices: false }, {
      onSuccess: () => dispatch(logoutAction()),
    });
  };

  const updateProfile = useMutation((data) =>
    axios.patch('http://localhost:3000/merchant/profile', data, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.data.data)
  );

  const onUpdateProfile = (data) => {
    updateProfile.mutate(data);
  };

  if (profileLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
      <p>Welcome, {user?.firstName} {user?.lastName}</p>
      <p>Business: {profile?.merchant?.business_name}</p>
      <button
        onClick={handleOrderCreate}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Create Order
      </button>
      <button
        onClick={handleLogout}
        className="mt-4 ml-4 p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
      <form onSubmit={handleSubmit(onUpdateProfile)} className="mt-4 space-y-4">
        <input
          {...register('business_name')}
          placeholder="Business Name"
          defaultValue={profile?.merchant?.business_name}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Update Profile
        </button>
      </form>
      <div className="mt-4">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 bg-gray-100 rounded mb-2"
          >
            {event.type === 'orderCreated' && <p>New Order: {event.data.orderId}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}