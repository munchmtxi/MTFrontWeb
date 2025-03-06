import { useSelector } from 'react-redux';

export default function CustomerDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Customer Dashboard</h1>
      <p>Welcome, {user?.firstName} {user?.lastName}</p>
      <p>View your orders and profile here.</p>
    </div>
  );
}