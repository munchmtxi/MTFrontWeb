/** @jsxImportSource @emotion/react */
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

import store from '@/store'; // Absolute import
import { getResponsiveTheme } from '@/styles/themeResponsive'; // Absolute import

// Public Pages
import Home from '@/pages/public/Home';
import Register from '@/pages/auth/Register';
import TwoFactorAuth from '@/pages/auth/TwoFactorAuth';
import Forbidden from '@/pages/public/Forbidden';
import NotFound from '@/pages/public/NotFound';
import ServerError from '@/pages/public/ServerError';

// Merchant Pages
import MerchantDashboard from '@/pages/merchant/MerchantDashboard';
import MerchantProfile from '@/pages/merchant/MerchantProfile';
import EditMerchantProfile from '@/pages/merchant/EditMerchantProfile';
import BusinessHours from '@/pages/merchant/BusinessHours';
import DeliverySettings from '@/pages/merchant/DeliverySettings';
import Branches from '@/pages/merchant/Branches';
import BranchManagement from '@/pages/merchant/BranchManagement';
import Banners from '@/pages/merchant/Banners';
import Analytics from '@/pages/merchant/Analytics';
import Drafts from '@/pages/merchant/Drafts';
import Images from '@/pages/merchant/Images';
import Maps from '@/pages/merchant/Maps';
import Merchant2FA from '@/pages/merchant/Merchant2FA';
import MerchantPassword from '@/pages/merchant/MerchantPassword';
import MerchantPerformanceMetrics from '@/pages/merchant/MerchantPerformanceMetrics';
import Products from '@/pages/merchant/Products';
import Inventory from '@/pages/merchant/Inventory';
import Reservations from '@/pages/merchant/Reservations';
import Orders from '@/pages/merchant/Orders';
import Staff from '@/pages/merchant/Staff';

// Staff Pages
import StaffDashboard from '@/pages/staff/StaffDashboard';
import StaffProfile from '@/pages/staff/StaffProfile';

// Driver Pages
import DriverDashboard from '@/pages/driver/DriverDashboard';
import DriverProfile from '@/pages/driver/DriverProfile';
import EditDriverProfile from '@/pages/driver/EditDriverProfile';
import DriverPassword from '@/pages/driver/DriverPassword';

// Customer Pages
import CustomerDashboard from '@/pages/customer/CustomerDashboard';
import CustomerProfile from '@/pages/customer/CustomerProfile';
import EditCustomerProfile from '@/pages/customer/EditCustomerProfile';
import CustomerPassword from '@/pages/customer/CustomerPassword';
import CustomerPayment from '@/pages/customer/CustomerPayment';
import TableBookings from '@/pages/customer/TableBookings';
import Rides from '@/pages/customer/Rides';
import CartPage from '@/pages/customer/CartPage';
import MenuPage from '@/pages/customer/MenuPage';
import CheckoutPage from '@/pages/customer/CheckoutPage';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';

// Logout Page (Optional)
import Logout from '@/pages/auth/Logout'; // Add this if you create a Logout component

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" style={{ padding: '20px', textAlign: 'center' }}>
    <h2>Something went wrong</h2>
    <pre style={{ color: 'red' }}>{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      style={{ padding: '10px 20px', marginTop: '10px' }}
    >
      Try Again
    </button>
  </div>
);

ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);
  const role = user?.role;

  if (!token) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(role))
    return <Navigate to="/forbidden" replace />;
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function App() {
  const theme = getResponsiveTheme('laptop');

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="/server-error" element={<ServerError />} />
                <Route path="/logout" element={<Logout />} /> {/* Optional logout route */}

                {/* Merchant Routes */}
                <Route
                  path="/merchant/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <MerchantDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/profile"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <MerchantProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/profile/edit"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <EditMerchantProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/business-hours"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <BusinessHours />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/delivery-settings"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <DeliverySettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/branches"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Branches />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/branch-management"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <BranchManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/banners"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Banners />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/analytics"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/drafts"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Drafts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/images"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Images />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/inventory"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Inventory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/maps"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Maps />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/2fa"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Merchant2FA />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/password"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <MerchantPassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/performance-metrics"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <MerchantPerformanceMetrics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/products"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/reservations/:branchId"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Reservations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/orders"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/staff"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <Staff />
                    </ProtectedRoute>
                  }
                />

                {/* Staff Routes */}
                <Route
                  path="/staff/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['staff']}>
                      <StaffDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/staff/profile"
                  element={
                    <ProtectedRoute allowedRoles={['staff']}>
                      <StaffProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Driver Routes */}
                <Route
                  path="/driver/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['driver']}>
                      <DriverDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/driver/profile"
                  element={
                    <ProtectedRoute allowedRoles={['driver']}>
                      <DriverProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/driver/profile/edit"
                  element={
                    <ProtectedRoute allowedRoles={['driver']}>
                      <EditDriverProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/driver/profile/password"
                  element={
                    <ProtectedRoute allowedRoles={['driver']}>
                      <DriverPassword />
                    </ProtectedRoute>
                  }
                />

                {/* Customer Routes */}
                <Route
                  path="/customer/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/profile"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <CustomerProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/profile/edit"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <EditCustomerProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/profile/password"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <CustomerPassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/profile/payment"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <CustomerPayment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/table-bookings"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <TableBookings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/rides"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <Rides />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/cart"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/menu"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <MenuPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/checkout"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}