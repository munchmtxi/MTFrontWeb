// src/store/index.js
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
import inventoryReducer from '../features/merchant/inventorySlice'; // Add this

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
    inventory: inventoryReducer, // Add this
  },
});

export default store;