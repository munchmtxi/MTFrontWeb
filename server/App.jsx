import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from '../src/store';
import Login from '../src/pages/auth/Login';
import Register from '../src/pages/auth/Register';
import MerchantDashboard from '../src/pages/merchant/MerchantDashboard';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect root to /login */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}