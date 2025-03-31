import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  sendFriendRequest as sendRequestApi,
  acceptFriendRequest as acceptRequestApi,
  rejectFriendRequest as rejectRequestApi,
  getFriendsList as getFriendsApi,
} from '../../api/customer/profile/friendApi';

export const sendFriendRequest = createAsyncThunk(
  'friends/sendRequest',
  async (friendId, { rejectWithValue }) => {
    try {
      return await sendRequestApi(friendId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to send friend request');
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      return await acceptRequestApi(requestId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to accept friend request');
    }
  }
);

export const rejectFriendRequest = createAsyncThunk(
  'friends/rejectRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      return await rejectRequestApi(requestId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to reject friend request');
    }
  }
);

export const getFriendsList = createAsyncThunk(
  'friends/getFriends',
  async (_, { rejectWithValue }) => {
    try {
      return await getFriendsApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to get friends list');
    }
  }
);