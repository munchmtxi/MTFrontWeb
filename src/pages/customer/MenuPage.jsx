/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useMenu } from '@/hooks/useMenu';
import { ArrowLeft, Package, ShoppingCart } from 'lucide-react';
import { contentStyles, cardTextStyles, buttonStyles } from '@/components/common/styles';

// Styles (aligned with MenuPage)
const pageStyles = css`
  min-height: 100vh;
  background: #000;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const sidebarStyles = css`
  width: 80px;
  background: #111;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
  }
`;

const iconWrapperStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
`;

const iconStyles = css`
  color: #e0e0e0;
  transition: color 0.3s ease;
`;

const sidebarLinkStyles = css`
  display: block;
  &.active .icon-wrapper {
    background-color: #1dbf1d;
  }
  &.active .icon {
    color: #000;
  }
  &:hover .icon-wrapper {
    background-color: #1dbf1d;
  }
  &:hover .icon {
    color: #000;
  }
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px 30px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const headerRightStyles = css`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  & svg {
    color: #e0e0e0;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: #1dbf1d;
    }
  }
`;

const badgeStyles = css`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #1dbf1d;
  color: #000;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const subscriptionCardStyles = css`
  background: #111;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #1dbf1d;
`;

const inputStyles = css`
  padding: 8px;
  width: 100%;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #333;
  background: #222;
  color: #e0e0e0;
`;

const SubscriptionPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { subscriptions, loading, error, fetchSubscriptions, createSubscription, updateSubscription, cancelSubscription, resetError } = useSubscription();
  const { items, fetchMenuItems } = useMenu();
  const [formData, setFormData] = useState({
    menu_item_id: '',
    schedule: 'daily',
    start_date: '',
    end_date: '',
  });
  const [editMode, setEditMode] = useState(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const defaultMerchantId = 36;

  const handleFetchData = useCallback(async () => {
    if (!loading && !hasFetchedData) {
      try {
        console.log('Fetching subscriptions and menu items...', { merchantId: defaultMerchantId });
        await fetchSubscriptions();
        await fetchMenuItems({ merchantId: defaultMerchantId });
        setHasFetchedData(true);
      } catch (err) {
        console.error('Data fetch failed:', err);
        setHasFetchedData(true); // Still set to true to prevent retries
      }
    }
  }, [fetchSubscriptions, fetchMenuItems, loading, hasFetchedData]);

  useEffect(() => {
    if (token && !hasFetchedData) {
      handleFetchData();
    }
  }, [token, handleFetchData, hasFetchedData]);

  if (!token || user?.role !== 'customer') {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubscription = async (e) => {
    e.preventDefault();
    try {
      await createSubscription(formData);
      setFormData({ menu_item_id: '', schedule: 'daily', start_date: '', end_date: '' });
    } catch (err) {
      console.error('Subscription creation failed:', err);
    }
  };

  const handleUpdateSubscription = async (subscriptionId) => {
    try {
      await updateSubscription(subscriptionId, formData);
      setEditMode(null);
      setFormData({ menu_item_id: '', schedule: 'daily', start_date: '', end_date: '' });
    } catch (err) {
      console.error('Subscription update failed:', err);
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      await cancelSubscription(subscriptionId, 'Customer request');
    } catch (err) {
      console.error('Subscription cancellation failed:', err);
    }
  };

  return (
    <div css={pageStyles}>
      <div css={sidebarStyles}>
        <Link to="/customer/dashboard" css={sidebarLinkStyles}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <ArrowLeft size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link to="/customer/subscriptions" css={sidebarLinkStyles} className="active">
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Package size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <h1 css={css`font-size: 18px; font-weight: 600; color: #1dbf1d;`}>Your Subscriptions</h1>
          <div css={headerRightStyles}>
            <Link to="/customer/cart" css={css`position: relative;`}>
              <ShoppingCart size={20} />
              {/* Add cart badge if cart data is available */}
            </Link>
          </div>
        </div>
        {loading && <p css={cardTextStyles}>Loading subscriptions...</p>}
        {error && (
          <div>
            <p css={cardTextStyles} style={{ color: 'red' }}>{error}</p>
            <button css={buttonStyles} onClick={resetError}>Clear Error</button>
          </div>
        )}
        {!loading && !error && (
          <>
            {/* Subscription Creation Form */}
            <div css={subscriptionCardStyles}>
              <h2 css={css`font-size: 16px; font-weight: 600; color: #1dbf1d; margin-bottom: 15px;`}>Create a New Subscription</h2>
              <form onSubmit={handleCreateSubscription}>
                <select
                  name="menu_item_id"
                  value={formData.menu_item_id}
                  onChange={handleInputChange}
                  css={inputStyles}
                  required
                >
                  <option value="">Select a Menu Item</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <select
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  css={inputStyles}
                  required
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  css={inputStyles}
                  required
                />
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  css={inputStyles}
                />
                <button type="submit" css={buttonStyles}>Create Subscription</button>
              </form>
            </div>

            {/* Subscription List */}
            <div css={contentStyles}>
              {subscriptions.length === 0 ? (
                <p css={cardTextStyles}>No subscriptions yet.</p>
              ) : (
                subscriptions.map((sub) => (
                  <div key={sub.id} css={subscriptionCardStyles}>
                    <p css={cardTextStyles}><strong>Item:</strong> {sub.menuItem}</p>
                    <p css={cardTextStyles}><strong>Schedule:</strong> {sub.schedule}</p>
                    <p css={cardTextStyles}><strong>Start Date:</strong> {new Date(sub.start_date).toLocaleDateString()}</p>
                    <p css={cardTextStyles}><strong>End Date:</strong> {sub.end_date ? new Date(sub.end_date).toLocaleDateString() : 'Ongoing'}</p>
                    <p css={cardTextStyles}><strong>Amount:</strong> ${sub.total_amount}</p>
                    <p css={cardTextStyles}><strong>Status:</strong> {sub.status}</p>
                    {editMode === sub.id ? (
                      <form onSubmit={(e) => { e.preventDefault(); handleUpdateSubscription(sub.id); }}>
                        <select
                          name="schedule"
                          value={formData.schedule}
                          onChange={handleInputChange}
                          css={inputStyles}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                        <input
                          type="date"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleInputChange}
                          css={inputStyles}
                        />
                        <button type="submit" css={buttonStyles}>Save</button>
                        <button css={buttonStyles} onClick={() => setEditMode(null)}>Cancel</button>
                      </form>
                    ) : (
                      <div>
                        <button
                          css={buttonStyles}
                          onClick={() => {
                            setEditMode(sub.id);
                            setFormData({ schedule: sub.schedule, end_date: sub.end_date || '' });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          css={buttonStyles}
                          onClick={() => handleCancelSubscription(sub.id)}
                          style={{ marginLeft: '10px', background: '#ff4444' }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;