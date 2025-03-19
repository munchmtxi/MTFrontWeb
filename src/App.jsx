/** @jsxImportSource @emotion/react */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
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

// Define queryClient here
const queryClient = new QueryClient();

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

              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}