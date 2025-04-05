import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: null,
  points: 0,
  tier: 'Bronze',
  redemptionHistory: [],
  loading: false,
  error: null,
};

const performanceIncentiveSlice = createSlice({
  name: 'performanceIncentive',
  initialState,
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setTier: (state, action) => {
      state.tier = action.payload;
    },
    addRedemption: (state, action) => {
      state.redemptionHistory.push(action.payload);
      state.points -= action.payload.pointsRedeemed;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetPerformance: () => initialState,
  },
});

export const {
  setMetrics,
  setPoints,
  setTier,
  addRedemption,
  setLoading,
  setError,
  resetPerformance,
} = performanceIncentiveSlice.actions;

export default performanceIncentiveSlice.reducer;