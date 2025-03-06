import { useSelector } from 'react-redux';

export default function StaffDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <p>Welcome, {user?.firstName} {user?.lastName}</p>
      <p>Handle staff tasks here.</p>
    </div>
  );
}