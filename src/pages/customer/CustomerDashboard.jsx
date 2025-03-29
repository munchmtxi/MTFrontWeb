/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Bell,
  Calendar,
  Car,
  Headphones,
  QrCode,
  Settings,
  ShoppingCart,
  User,
  Utensils,
  Package,
} from 'lucide-react';
import { useMenu } from '@hooks/useMenu';
import { useCart } from '@hooks/useCart';
import { useOrder } from '@hooks/useOrder';
import { cardStyles, cardHeadingStyles, cardTextStyles, buttonStyles } from '@/components/common/styles';
import OrderStatus from '@/components/customer/OrderStatus';

// Styles
const dashboardStyles = css`
  min-height: 100vh;
  background: #000;
  color: #fff;
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
  color: #fff;
  transition: color 0.3s ease;
`;

const sidebarLinkStyles = css`
  display: block;
  &.active .icon-wrapper { background-color: #1dbf1d; }
  &.active .icon { color: #000; }
  &:hover .icon-wrapper { background-color: #1dbf1d; }
  &:hover .icon { color: #000; }
  &.checkin .icon-wrapper, &.contact .icon-wrapper {
    width: 48px;
    height: 48px;
  }
  &.checkin .icon, &.contact .icon {
    width: 28px;
    height: 28px;
  }
`;

const mainContentStyles = css`
  flex: 1;
  padding: 20px 0;
  padding-top: 15px;
  @media (max-width: 768px) { padding: 10px; }
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
    color: #fff;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover { color: #1dbf1d; }
  }
`;

const dropdownStyle = css`
  position: relative;
  display: inline-block;
`;

const dropdownContentStyle = css`
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 8px;
  &.show { display: block; }
`;

const dropdownLinkStyle = css`
  color: black;
  padding: 0.5rem 1rem;
  text-decoration: none;
  display: block;
  &:hover { background-color: #f1f1f1; }
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

const CustomerDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { cart, addItem, clearItems } = useCart();
  const { merchant, items, loading: menuLoading, error: menuError, fetchMenuItems, resetError: resetMenuError } = useMenu();
  const { orders, loading: orderLoading, error: orderError, fetchOrderStatus } = useOrder();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [hasFetchedMenu, setHasFetchedMenu] = useState(false);
  const [selectedMerchantId, setSelectedMerchantId] = useState(null);
  const defaultMerchantId = 36;

  const handleFetchMenu = useCallback(async () => {
    if (!menuLoading && !hasFetchedMenu) {
      try {
        const merchantIdToFetch = selectedMerchantId || defaultMerchantId;
        await fetchMenuItems({ merchantId: merchantIdToFetch });
        setHasFetchedMenu(true);
      } catch (err) {
        console.error('Menu fetch failed:', err);
      } finally {
        setHasFetchedMenu(true);
      }
    }
  }, [fetchMenuItems, menuLoading, hasFetchedMenu, selectedMerchantId]);

  useEffect(() => {
    if (token && activeTab === 'order' && !items.length && !hasFetchedMenu && !menuLoading) {
      handleFetchMenu();
    }
  }, [token, activeTab, items.length, handleFetchMenu, hasFetchedMenu, menuLoading]);

  if (!token || user?.role !== 'customer') {
    return <Navigate to="/" replace />;
  }

  const profile = {
    id: user?.id,
    first_name: user?.firstName || 'John',
    last_name: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1234567890',
    country: user?.country || 'USA',
    avatar_url: user?.avatar_url || 'https://via.placeholder.com/40x40',
  };

  const handleAddToCart = (item) => {
    addItem({ id: item.id, name: item.name, price: item.final_price, quantity: 1 });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><User size={20} /> Profile Details</h3>
              <div css={css`display: flex; align-items: center; gap: 20px; margin-bottom: 20px;`}>
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  css={css`width: 40px; height: 40px; border-radius: 50%; border: 2px solid #1dbf1d;`}
                />
                <div>
                  <p css={cardTextStyles}>Name: {profile.first_name} {profile.last_name}</p>
                  <p css={cardTextStyles}>Email: {profile.email}</p>
                  <p css={cardTextStyles}>Phone: {profile.phone}</p>
                  <p css={cardTextStyles}>Country: {profile.country}</p>
                </div>
              </div>
              <Link to="/customer/profile/edit" css={buttonStyles}>Edit Profile</Link>
            </div>
          </div>
        );
      case 'order':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><Utensils size={20} /> Browse Menu</h3>
              <p css={cardTextStyles}>Currently showing menu for Merchant ID {selectedMerchantId || defaultMerchantId}</p>
              {menuLoading && <p css={cardTextStyles}>Loading menu items...</p>}
              {menuError && (
                <>
                  <p css={cardTextStyles} style={{ color: 'red' }}>{menuError}</p>
                  <button css={buttonStyles} onClick={resetMenuError}>Clear Error</button>
                </>
              )}
              {!menuLoading && !menuError && items.length === 0 && (
                <p css={cardTextStyles}>No menu items available for this merchant.</p>
              )}
              {!menuLoading && !menuError && items.length > 0 && (
                <ul css={css`list-style: none; padding: 0;`}>
                  {items.slice(0, 5).map((item) => (
                    <li key={item.id} css={css`margin: 10px 0; display: flex; justify-content: space-between; align-items: center;`}>
                      <span css={cardTextStyles}>{item.name} - ${item.final_price?.toFixed(2)}</span>
                      <button
                        css={buttonStyles}
                        onClick={() => handleAddToCart(item)}
                        disabled={item.availability_status !== 'in-stock' || item.quantity < 1}
                      >
                        {item.availability_status === 'in-stock' && item.quantity >= 1 ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/customer/menu" css={buttonStyles}>View Full Menu</Link>
            </div>
          </div>
        );
      case 'cart':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><ShoppingCart size={20} /> Your Cart</h3>
              {cart.items.length === 0 ? (
                <p css={cardTextStyles}>Your cart is empty.</p>
              ) : (
                <>
                  <ul css={css`list-style: none; padding: 0;`}>
                    {cart.items.map((item, index) => (
                      <li key={index} css={css`margin: 10px 0;`}>
                        <p css={cardTextStyles}>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</p>
                      </li>
                    ))}
                  </ul>
                  <button css={buttonStyles} onClick={clearItems}>Clear Cart</button>
                  <Link to="/customer/cart" css={buttonStyles}>Proceed to Checkout</Link>
                </>
              )}
            </div>
          </div>
        );
      case 'checkin':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><QrCode size={20} /> Check In</h3>
              <p css={cardTextStyles}>Scan a QR code or enter a code to check in at a location.</p>
              <input
                type="text"
                placeholder="Enter Check-In Code"
                css={css`padding: 8px; width: 100%; margin: 10px 0; border-radius: 4px; border: 1px solid #ccc; color: #000;`}
              />
              <button css={buttonStyles} onClick={() => console.log('Check In Submitted')}>
                Submit Check-In
              </button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><Settings size={20} /> Settings</h3>
              <p css={cardTextStyles}>Manage your account settings here.</p>
              <Link to="/customer/profile/password" css={buttonStyles}>Change Password</Link>
              <Link to="/customer/profile/payment" css={buttonStyles} style={{ marginLeft: '10px' }}>
                Payment Methods
              </Link>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><Headphones size={20} /> Contact Support</h3>
              <p css={cardTextStyles}>Need help? Reach out to our support team.</p>
              <p css={cardTextStyles}>Email: support@example.com</p>
              <p css={cardTextStyles}>Phone: +1-800-555-1234</p>
              <button css={buttonStyles} onClick={() => console.log('Live Chat Initiated')}>
                Start Live Chat
              </button>
            </div>
          </div>
        );
      case 'orders': 
        return (
          <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;`}>
            <div css={cardStyles} style={{ gridColumn: 'span 2' }}>
              <h3 css={cardHeadingStyles}><Package size={20} /> Your Orders</h3>
              {orderLoading && <p css={cardTextStyles}>Loading orders...</p>}
              {orderError && <p css={cardTextStyles} style={{ color: 'red' }}>{orderError}</p>}
              {!orderLoading && !orderError && orders.length === 0 && (
                <p css={cardTextStyles}>You have no orders yet.</p>
              )}
              {!orderLoading && !orderError && orders.length > 0 && (
                orders.map(order => (
                  <OrderStatus key={order.order_id} order={order} />
                ))
              )}
            </div>
          </div>
        );
      default:
        return <div css={cardTextStyles}>Select a section to view its content</div>;
    }
  };

  return (
    <div css={dashboardStyles}>
      <div css={sidebarStyles}>
        <Link
          to="/customer/table-bookings"
          css={sidebarLinkStyles}
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Calendar size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={activeTab === 'order' ? 'active' : ''}
          onClick={() => setActiveTab('order')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Utensils size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="/customer/rides"
          css={sidebarLinkStyles}
          className={activeTab === 'rides' ? 'active' : ''}
          onClick={() => setActiveTab('rides')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Car size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={`checkin ${activeTab === 'checkin' ? 'active' : ''}`}
          onClick={() => setActiveTab('checkin')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <QrCode size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Package size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Settings size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
        <Link
          to="#"
          css={sidebarLinkStyles}
          className={`contact ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <div css={iconWrapperStyles} className="icon-wrapper">
            <Headphones size={24} css={iconStyles} className="icon" />
          </div>
        </Link>
      </div>
      <div css={mainContentStyles}>
        <div css={headerStyles}>
          <h1 css={css`font-size: 18px; font-weight: 600; color: #1dbf1d;`}>Good Day, {profile.email}!</h1>
          <div css={headerRightStyles}>
            <Bell size={20} onClick={() => console.log('Notifications clicked')} />
            <Link to="/customer/cart" css={css`position: relative;`}>
              <ShoppingCart size={20} />
              {cart.items.length > 0 && <span css={badgeStyles}>{cart.items.length}</span>}
            </Link>
            <div css={dropdownStyle}>
              <User size={20} onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} />
              <div css={dropdownContentStyle} className={profileDropdownOpen ? 'show' : ''}>
                <Link
                  to="#"
                  css={dropdownLinkStyle}
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setActiveTab('profile');
                  }}
                >
                  View Profile
                </Link>
                <Link
                  to="/customer/profile/edit"
                  css={dropdownLinkStyle}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Edit Profile
                </Link>
                <Link
                  to="/customer/profile/password"
                  css={dropdownLinkStyle}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Change Password
                </Link>
                <Link
                  to="/customer/profile/payment"
                  css={dropdownLinkStyle}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Payment Methods
                </Link>
                <Link to="/logout" css={dropdownLinkStyle} onClick={() => setProfileDropdownOpen(false)}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerDashboard;
