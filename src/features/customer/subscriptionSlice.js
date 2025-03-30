import { createSlice } from '@reduxjs/toolkit';
import { fetchSubscriptions, createSubscription, updateSubscription, cancelSubscription } from './subscriptionThunks';

const initialState = {
  subscriptions: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Subscriptions
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload.data.subscriptions;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch subscriptions';
      })
      // Create Subscription
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions.push(action.payload.data.subscription);
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create subscription';
      })
      // Update Subscription
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSubscription = action.payload.data.subscription;
        const index = state.subscriptions.findIndex((sub) => sub.id === updatedSubscription.id);
        if (index !== -1) state.subscriptions[index] = updatedSubscription;
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update subscription';
      })
      // Cancel Subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.filter(
          (sub) => sub.id !== action.meta.arg.subscriptionId
        );
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to cancel subscription';
      });
  },
});

export const { resetError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;