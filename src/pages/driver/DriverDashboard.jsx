import { useSelector } from 'react-redux';

export default function DriverDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Driver Dashboard</h1>
      <p>Welcome, {user?.firstName} {user?.lastName}</p>
      <p>Manage your routes here.</p>
    </div>
  );
}