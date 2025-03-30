import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import socketReducer from '../features/socket/socketSlice';
import merchantProfileReducer from '../features/merchant/merchantProfileSlice';
import bannerReducer from '../features/merchant/bannerSlice';
import activityLogReducer from '../features/merchant/activityLogSlice';
import analyticsReducer from '../features/merchant/analyticsSlice';
import draftReducer from '../features/merchant/draftSlice';
import imageReducer from '../features/merchant/imageSlice';
import mapsReducer from '../features/merchant/mapsSlice';
import merchant2FAReducer from '../features/merchant/merchant2FASlice';
import merchantPasswordReducer from '../features/merchant/merchantPasswordSlice';
import merchantPerformanceMetricsReducer from '../features/merchant/merchantPerformanceMetricsSlice';
import merchantPreviewReducer from '../features/merchant/merchantPreviewSlice';
import branchReducer from '../features/merchant/branch/branchSlice';
import productReducer from '../features/merchant/productSlice';
import inventoryReducer from '../features/merchant/inventorySlice';
import reservationReducer from '../features/merchant/reservation/reservationSlice';
import staffProfileReducer from '../features/staff/profile/staffProfileSlice';
import bookingReducer from '../features/customer/bookingSlice';
import rideReducer from '../features/customer/rideSlice';
import cartReducer from '../features/customer/cartSlice';
import menuReducer from '../features/customer/menuSlice';
import orderReducer from '../features/customer/orderSlice';
import subscriptionReducer from '../features/customer/subscriptionSlice'; // New import

const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    merchantProfile: merchantProfileReducer,
    banner: bannerReducer,
    activityLog: activityLogReducer,
    analytics: analyticsReducer,
    draft: draftReducer,
    image: imageReducer,
    maps: mapsReducer,
    merchant2FA: merchant2FAReducer,
    merchantPassword: merchantPasswordReducer,
    merchantPerformanceMetrics: merchantPerformanceMetricsReducer,
    merchantPreview: merchantPreviewReducer,
    branch: branchReducer,
    products: productReducer,
    inventory: inventoryReducer,
    reservation: reservationReducer,
    staffProfile: staffProfileReducer,
    booking: bookingReducer,
    ride: rideReducer,
    cart: cartReducer,
    menu: menuReducer,
    order: orderReducer,
    subscription: subscriptionReducer, // New reducer
  },
});

export default store;