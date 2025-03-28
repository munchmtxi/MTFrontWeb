/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BarChart, ClipboardList, Utensils, Users, Package, PieChart } from 'lucide-react';
import axios from '../../api/axios';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useBranches from '../../hooks/useBranches'; // Add this import

const styles = `
  .reservations-page {
    min-height: 100vh;
    background: #1a202c;
    color: #d1d5db;
    font-family: 'Inter', sans-serif;
    display: flex;
  }
  .sidebar {
    width: 80px;
    background: #111827;
    padding: 80px 0 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .sidebar-link {
    color: #6b7280;
    transition: color 0.3s ease;
  }
  .sidebar-link:hover, .sidebar-link.active {
    color: #fedc01;
  }
  .main-content {
    flex: 1;
    padding: 20px;
    padding-top: 80px;
  }
  .header {
    background: #111827;
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    background: #2d3748;
    border-radius: 10px;
    padding: 20px;
  }
  .content h2 {
    font-size: 18px;
    color: #fedc01;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .reservation-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .reservation-item {
    background: #1f2937;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .reservation-item p {
    font-size: 14px;
    margin: 5px 0;
  }
  .cancel-btn {
    padding: 6px 12px;
    background: #dc3545;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    &:hover {
      background: #c82333;
    }
  }
  .error {
    color: #dc3545;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
  }
`;

const Reservations = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { branches, getBranches, loading } = useBranches(); // Use the hook
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [error, setError] = useState(null);
  const { branchId } = useParams();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (branches.length === 0 && !loading) getBranches(); // Fetch branches if not loaded
  }, [branches, loading, getBranches]);

  const defaultBranchId = branches.length > 0 ? branches[0].id : '1'; // Match MerchantHeader logic

  const fetchReservations = async (retries = 3, delay = 1000) => {
    if (!branchId) {
      setError('No branch ID provided');
      setLoadingReservations(false);
      return;
    }
    setLoadingReservations(true);
    try {
      const response = await axios.get(`/api/merchant/reservation/branches/${branchId}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(response.data || []);
      setLoadingReservations(false);
      hasFetched.current = true;
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchReservations(retries - 1, delay * 2);
      }
      setError(err.response?.data?.message || 'Failed to fetch reservations');
      setLoadingReservations(false);
    }
  };

  const cancelReservation = async (reservationId) => {
    try {
      await axios.delete(`/api/merchant/reservation/branches/${branchId}/bookings/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(reservations.filter((r) => r.id !== reservationId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel reservation');
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    fetchReservations();
  }, [branchId, token]);

  if (!token || user?.role !== 'merchant') return <Navigate to="/" replace />;

  return (
    <div className="reservations-page">
      <style>{styles}</style>
      <MerchantHeader />
      <div className="sidebar">
        <Link to="/merchant/dashboard" className="sidebar-link"><BarChart size={24} /></Link>
        <Link to="/merchant/orders" className="sidebar-link"><ClipboardList size={24} /></Link>
        <Link to={`/merchant/reservations/${defaultBranchId}`} className="sidebar-link active"><Utensils size={24} /></Link>
        <Link to="/merchant/staff" className="sidebar-link"><Users size={24} /></Link>
        <Link to="/merchant/inventory" className="sidebar-link"><Package size={24} /></Link>
        <Link to="/merchant/analytics" className="sidebar-link"><PieChart size={24} /></Link>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 style={{ fontSize: '20px', color: '#fedc01' }}>Reservations</h1>
          <span>{user?.email}</span>
        </div>
        <div className="content">
          <h2><Utensils size={20} /> Reservations for Branch {branchId}</h2>
          {loadingReservations ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="error">{error}</p>
          ) : reservations.length > 0 ? (
            <div className="reservation-list">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="reservation-item">
                  <div>
                    <p><strong>Table:</strong> {reservation.table?.table_number || 'N/A'} (Branch: {reservation.branch_id || 'N/A'})</p>
                    <p><strong>Date:</strong> {reservation.booking_date ? new Date(reservation.booking_date).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Time:</strong> {reservation.booking_time || 'N/A'}</p>
                    <p><strong>Guests:</strong> {reservation.guest_count || 'N/A'}</p>
                    <p><strong>Customer:</strong> {reservation.customer?.user?.first_name || reservation.customer?.user?.email || 'N/A'}</p>
                  </div>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelReservation(reservation.id)}
                    disabled={loadingReservations}
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No reservations found for this branch.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;