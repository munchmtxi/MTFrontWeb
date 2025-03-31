import { createSlice } from '@reduxjs/toolkit';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendsList,
} from './friendThunks';

const initialState = {
  friends: [],
  pendingRequests: [],
  loading: false,
  error: null,
};

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    resetFriendError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests.push(action.payload.data);
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = state.pendingRequests.filter(
          (req) => req.id !== action.meta.arg.requestId
        );
        state.friends.push(action.payload.data);
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(rejectFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = state.pendingRequests.filter(
          (req) => req.id !== action.meta.arg.requestId
        );
      })
      .addCase(rejectFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFriendsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFriendsList.fulfilled, (state, action) => {
        state.loading = false;
        const friendsData = action.payload.data.friends || action.payload.data; // Handle both cases
        state.friends = friendsData.filter((f) => f.status === 'accepted');
        state.pendingRequests = friendsData.filter((f) => f.status === 'pending');
      })
      .addCase(getFriendsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetFriendError } = friendSlice.actions;
export default friendSlice.reducer;