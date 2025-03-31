/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowLeft,
  Users,
  Plus,
  Check,
  X,
  ShoppingCart,
} from 'lucide-react';
import useFriends from '@hooks/useFriends';
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

const friendListStyles = css`
  display: grid;
  gap: 10px;
`;

const friendItemStyles = css`
  padding: 10px;
  background: #222;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const errorStyles = css`
  color: #ff4d4d;
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
`;

const FriendsPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useCart();
  const {
    friends,
    pendingRequests,
    loading,
    error,
    sendRequest,
    acceptRequest,
    rejectRequest,
    getFriends,
    resetError,
  } = useFriends();

  const [friendId, setFriendId] = useState('');

  if (!token || user?.role !== 'customer') return <Navigate to="/" replace />;

  const profile = { email: user?.email || 'john.doe@example.com' };

  useEffect(() => {
    if (!friends.length && !pendingRequests.length) getFriends();
  }, [getFriends, friends.length, pendingRequests.length]);

  const handleSendRequest = (e) => {
    e.preventDefault();
    sendRequest(friendId);
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
        <Link to="/customer/friends" css={sidebarLinkStyles} className="active">
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Users size={24} css={iconStyles} className="icon" />
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
          {/* Send Friend Request */}
          <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
            <h3 css={cardHeadingStyles}><Users size={20} /> Friends</h3>
            <form css={formStyles} onSubmit={handleSendRequest}>
              <label>
                Friend ID:
                <input
                  type="text"
                  value={friendId}
                  onChange={(e) => setFriendId(e.target.value)}
                  placeholder="Enter Friend ID"
                  required
                />
              </label>
              <button type="submit" css={buttonStyles} disabled={loading}>
                <Plus size={16} /> Send Request
              </button>
            </form>
          </div>

          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}>Pending Requests</h3>
              <div css={friendListStyles}>
                {pendingRequests.map((req) => (
                  <div key={req.id} css={friendItemStyles}>
                    <span css={cardTextStyles}>User #{req.friendId}</span>
                    <div>
                      <button
                        css={buttonStyles}
                        onClick={() => acceptRequest(req.id)}
                        disabled={loading}
                      >
                        <Check size={16} /> Accept
                      </button>
                      <button
                        css={buttonStyles}
                        onClick={() => rejectRequest(req.id)}
                        disabled={loading}
                        style={{ marginLeft: '10px' }}
                      >
                        <X size={16} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Friends List */}
          {friends.length > 0 && (
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}>Your Friends</h3>
              <div css={friendListStyles}>
                {friends.map((friend) => (
                  <div key={friend.userId} css={friendItemStyles}>
                    <span css={cardTextStyles}>{friend.fullName} (#{friend.userId})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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

export default FriendsPage;