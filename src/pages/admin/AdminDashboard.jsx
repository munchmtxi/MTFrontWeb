import { useSelector } from 'react-redux';

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {user?.firstName} {user?.lastName}</p>
      <p>Administer the system here.</p>
    </div>
  );
}