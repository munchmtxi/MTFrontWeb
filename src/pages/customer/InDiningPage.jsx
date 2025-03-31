/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowLeft,
  Coffee,
  Plus,
  UserPlus,
  CheckCircle,
  X,
  ShoppingCart,
  CreditCard,
  Star,
  Users,
} from 'lucide-react';
import useInDining from '@hooks/useInDining';
import { useCart } from '@hooks/useCart';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  cardStyles,
  cardHeadingStyles,
  cardTextStyles,
  buttonStyles,
} from '../../components/common/styles';

// Styles remain unchanged
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

const formStyles = css`
  display: grid;
  gap: 15px;
  & label {
    color: #ccc;
    font-size: 14px;
    margin-bottom: 5px;
  }
  & input {
    padding: 10px;
    background: #333;
    border: 1px solid #444;
    border-radius: 6px;
    color: #e0e0e0;
    width: 100%;
    &:focus {
      border-color: #1dbf1d;
      outline: none;
    }
  }
`;

const itemListStyles = css`
  display: grid;
  gap: 10px;
  margin-top: 15px;
`;

const itemStyles = css`
  padding: 10px;
  background: #222;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const toggleButtonStyles = css`
  ${buttonStyles}
  width: 100%;
`;

const errorStyles = css`
  color: #ff4d4d;
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
`;

const InDiningPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useCart();
  const {
    orders,
    recommendations,
    activeSession,
    loading,
    error,
    addItem,
    updateOrder,
    closeOrder,
    getOrderStatus,
    payOrder,
    getRecommendations,
    addTip,
    getActiveSession,
    addFriend,
    resetError,
  } = useInDining();

  const [orderId, setOrderId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [itemData, setItemData] = useState({ menu_item_id: '', quantity: 1 });
  const [tipData, setTipData] = useState({ amount: '', allocation: { staff_percentage: 100 } });
  const [friendId, setFriendId] = useState('');
  const [showFriends, setShowFriends] = useState(false);

  if (!token || user?.role !== 'customer') return <Navigate to="/" replace />;

  const profile = { email: user?.email || 'john.doe@example.com' };

  useEffect(() => {
    if (orderId && !orders[orderId]) getOrderStatus(orderId);
    if (branchId && !recommendations.length) getRecommendations(branchId);
  }, [orderId, branchId, getOrderStatus, getRecommendations, orders, recommendations]);

  const handleAddItem = (e) => {
    e.preventDefault();
    addItem(orderId, [{ menu_item_id: itemData.menu_item_id, quantity: Number(itemData.quantity), customization: {} }]);
    setItemData({ menu_item_id: '', quantity: 1 });
  };

  const handleUpdateOrder = () => updateOrder(orderId, { notes: 'Updated by user' });
  const handleCloseOrder = () => closeOrder(orderId);
  const handlePayOrder = () => payOrder(orderId, {
    payment_method: 'BANK_CARD',
    card_details: { number: '1234-5678-9012-3456', expiry: '12/25', cvv: '123' },
  });
  const handleAddTip = (e) => {
    e.preventDefault();
    addTip(orderId, { amount: Number(tipData.amount), allocation: tipData.allocation });
    setTipData({ amount: '', allocation: { staff_percentage: 100 } });
  };
  const handleGetSession = () => getActiveSession(orderId);
  const handleAddFriend = (e) => {
    e.preventDefault();
    addFriend(orderId, friendId);
    setFriendId('');
  };

  return (
    <div css={pageStyles}>
      <div css={sidebarStyles}>
        <Link to="/customer/dashboard" css={sidebarLinkStyles}>
          <div css={iconWrapperStyles} className="icon-wrapper">
            <ArrowLeft size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link to="/customer/in-dining" css={sidebarLinkStyles} className="active">
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Coffee size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <h1 css={css`font-size: 18px; font-weight: 600; color: #1dbf1d;`}>Good Day, {profile.email}!</h1>
          <div css={headerRightStyles}>
            <Link to="/customer/cart" css={css`position: relative;`}>
              <ShoppingCart size={20} />
              {cart.items.length > 0 && <span css={badgeStyles}>{cart.items.length}</span>}
            </Link>
          </div>
        </div>
        <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
          {/* Order Management */}
          <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
            <h3 css={cardHeadingStyles}><Coffee size={20} /> In-Dining Order</h3>
            <form css={formStyles} onSubmit={handleAddItem}>
              <label>
                Order ID:
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter Order ID"
                  required
                />
              </label>
              <label>
                Menu Item ID:
                <input
                  type="text"
                  value={itemData.menu_item_id}
                  onChange={(e) => setItemData({ ...itemData, menu_item_id: e.target.value })}
                  placeholder="Enter Menu Item ID"
                  required
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  value={itemData.quantity}
                  onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })}
                  min="1"
                  required
                />
              </label>
              <button type="submit" css={buttonStyles} disabled={loading}>
                <Plus size={16} /> Add Item
              </button>
            </form>
            {orders[orderId] && (
              <div css={itemListStyles}>
                {orders[orderId].orderItems?.map((item, index) => (
                  <div key={index} css={itemStyles}>
                    <span css={cardTextStyles}>{item.menuItem?.name} x {item.quantity}</span>
                  </div>
                ))}
                <button css={buttonStyles} onClick={handleUpdateOrder} disabled={loading}>
                  Update Order
                </button>
                <button css={buttonStyles} onClick={handleCloseOrder} disabled={loading}>
                  Close Order
                </button>
                <button css={buttonStyles} onClick={handlePayOrder} disabled={loading}>
                  <CreditCard size={16} /> Pay Order
                </button>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
            <h3 css={cardHeadingStyles}><Star size={20} /> Recommendations</h3>
            <label css={formStyles}>
              Branch ID:
              <input
                type="text"
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                placeholder="Enter Branch ID"
              />
            </label>
            {recommendations.length > 0 && (
              <div css={itemListStyles}>
                {recommendations.slice(0, 5).map((item) => (
                  <div key={item.id} css={itemStyles}>
                    <span css={cardTextStyles}>{item.name} - ${item.price?.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          purged {/* Tip */}
          <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
            <h3 css={cardHeadingStyles}><Star size={20} /> Add Tip</h3>
            <form css={formStyles} onSubmit={handleAddTip}>
              <label>
                Tip Amount:
                <input
                  type="number"
                  value={tipData.amount}
                  onChange={(e) => setTipData({ ...tipData, amount: e.target.value })}
                  placeholder="Enter tip amount"
                  min="0"
                  step="0.01"
                  required
                />
              </label>
              <button type="submit" css={buttonStyles} disabled={loading}>
                <Plus size={16} /> Add Tip
              </button>
            </form>
          </div>

          {/* Active Session */}
          <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
            <button css={toggleButtonStyles} onClick={() => setShowFriends(!showFriends)}>
              <CheckCircle size={20} /> Manage Session
            </button>
            {showFriends && (
              <div css={css`margin-top: 15px;`}>
                <h3 css={cardHeadingStyles}><Users size={20} /> Active Session</h3>
                <button css={buttonStyles} onClick={handleGetSession} disabled={loading}>
                  Get Session
                </button>
                {activeSession && (
                  <div css={itemListStyles}>
                    <p css={cardTextStyles}>Users: {activeSession.activeUsers?.map((u) => u.fullName).join(', ')}</p>
                    <form css={formStyles} onSubmit={handleAddFriend}>
                      <label>
                        Friend User ID:
                        <input
                          type="text"
                          value={friendId}
                          onChange={(e) => setFriendId(e.target.value)}
                          placeholder="Enter Friend ID"
                          required
                        />
                      </label>
                      <button type="submit" css={buttonStyles} disabled={loading}>
                        <UserPlus size={16} /> Add Friend
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>

          {loading && <LoadingSpinner />}
          {error && (
            <div css={errorStyles}>
              {error} <button css={buttonStyles} onClick={resetError}>Clear Error</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InDiningPage;