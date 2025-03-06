// C:\Users\munch\Desktop\MTFrontWeb\server\App.jsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from '../src/store';
import Login from '../src/pages/auth/Login';
import Register from '../src/pages/auth/Register';
import TwoFactorAuth from '../src/pages/auth/TwoFactorAuth';
import MerchantDashboard from '../src/pages/merchant/MerchantDashboard';
import CustomerDashboard from '../src/pages/customer/CustomerDashboard';
import DriverDashboard from '../src/pages/driver/DriverDashboard';
import StaffDashboard from '../src/pages/staff/StaffDashboard';
import AdminDashboard from '../src/pages/admin/AdminDashboard';

// Create a QueryClient instance
const queryClient = new QueryClient();

// ProtectedRoute component to enforce authentication and roles
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/2fa" element={<TwoFactorAuth />} />

            {/* Protected Routes */}
            <Route
              path="/merchant/dashboard"
              element={
                <ProtectedRoute allowedRoles={['merchant']}>
                  <MerchantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver/dashboard"
              element={
                <ProtectedRoute allowedRoles={['driver']}>
                  <DriverDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/dashboard"
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}