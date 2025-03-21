/** @jsxImportSource @emotion/react */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import store from './store';
import { getResponsiveTheme } from './styles/themeResponsive';
import Home from './pages/public/Home';
import Register from './pages/auth/Register';
import TwoFactorAuth from './pages/auth/TwoFactorAuth';
import Forbidden from './pages/public/Forbidden';
import NotFound from './pages/public/NotFound';
import ServerError from './pages/public/ServerError';
import MerchantDashboard from './pages/merchant/MerchantDashboard';
import MerchantProfile from './pages/merchant/MerchantProfile';
import EditMerchantProfile from './pages/merchant/EditMerchantProfile';
import BusinessHours from './pages/merchant/BusinessHours';
import DeliverySettings from './pages/merchant/DeliverySettings';
import Branches from './pages/merchant/Branches';
import Banners from './pages/merchant/Banners';
import ActivityLog from './pages/merchant/ActivityLog';
import Analytics from './pages/merchant/Analytics';
import Drafts from './pages/merchant/Drafts';
import Images from './pages/merchant/Images';
import Maps from './pages/merchant/Maps';
import Merchant2FA from './pages/merchant/Merchant2FA';
import MerchantPassword from './pages/merchant/MerchantPassword';
import MerchantPerformanceMetrics from './pages/merchant/MerchantPerformanceMetrics';
import MerchantPreview from './pages/merchant/MerchantPreview';
import BranchManagement from './pages/merchant/BranchManagement';

const queryClient = new QueryClient();

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
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/forbidden" replace />;
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
                  path="/merchant/activity-log"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <ActivityLog />
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
                  path="/merchant/preview"
                  element={
                    <ProtectedRoute allowedRoles={['merchant']}>
                      <MerchantPreview />
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